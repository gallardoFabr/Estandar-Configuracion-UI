import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { defaultTheme } from '@/data/defaultTheme.js'
import { getContrastColor } from '@/utils/colorUtils.js'

const CUSTOM_PALETTES_KEY = 'gui-builder-custom-palettes'
const clone = (value) => JSON.parse(JSON.stringify(value))

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(clone(defaultTheme))
  const savedPalettes = ref([])

  try {
    const stored = localStorage.getItem(CUSTOM_PALETTES_KEY)
    savedPalettes.value = stored ? JSON.parse(stored) : []
  } catch (e) {
    savedPalettes.value = []
  }

  function persistPalettes() {
    localStorage.setItem(CUSTOM_PALETTES_KEY, JSON.stringify(savedPalettes.value))
  }

  // --- Color actions ---
  // Los colores del estándar están "linkeados" a las secciones que los usan:
  // al cambiar un color base, todas las secciones relacionadas se actualizan
  // automáticamente (botones, estados, errores, formularios, tablas, layout).
  function updateColor(key, value) {
    theme.value.colors[key] = value
    syncLinkedColors(key, value)
  }

  function syncLinkedColors(key, value) {
    const t = theme.value
    switch (key) {
      case 'primary': {
        t.buttons.primary.background = value
        t.buttons.primary.borderColor = value
        t.buttons.secondary.color = value
        t.buttons.secondary.borderColor = value
        // El botón Eliminar siempre refleja el color primario.
        t.buttons.delete.background = value
        t.buttons.delete.borderColor = value
        t.forms.focusBorderColor = value
        if (t.tables._hoverLinked !== false) {
          t.tables.rowHoverBackground = `${value}18`
        }
        break
      }
      case 'secondary': {
        t.layout.sidebar.background = value
        if (t.layout.sidebar._iconLinked !== false) {
          t.layout.sidebar.iconColor = getContrastColor(value)
          t.tables.headerBackground = getContrastColor(value)
        }
        break
      }
      case 'error': {
        t.buttons.cancel.background = value
        t.buttons.cancel.borderColor = value
        t.buttons.retry.background = value
        t.buttons.retry.borderColor = value
        t.forms.errorBorderColor = value
        t.forms.errorColor = value
        t.states.error.color = value
        t.states.error.background = `${value}18`
        t.states.error.border = `${value}40`
        t.errors.validation.color = value
        t.errors.operation.color = value
        t.errors.operation.background = `${value}10`
        t.errors.operation.border = `1px solid ${value}40`
        break
      }
      case 'success': {
        t.states.success.color = value
        t.states.success.background = `${value}18`
        t.states.success.border = `${value}40`
        break
      }
      case 'warning': {
        t.states.warning.color = value
        t.states.warning.background = `${value}18`
        t.states.warning.border = `${value}40`
        t.errors.businessRule.color = value
        t.errors.businessRule.background = `${value}10`
        t.errors.businessRule.border = `1px solid ${value}40`
        break
      }
      case 'info': {
        t.states.info.color = value
        t.states.info.background = `${value}18`
        t.states.info.border = `${value}40`
        break
      }
      case 'textPrimary': {
        t.forms.labelColor = value
        break
      }
    }
  }

  function applyPalette(palette) {
    // Las paletas completas son snapshots de TODO el estándar GUI.
    // Se mantiene compatibilidad con paletas antiguas que solo contenían colores.
    if (palette?.theme) {
      theme.value = clone(palette.theme)
      return
    }
    const colors = palette?.colors || palette || {}
    Object.keys(colors).forEach(key => {
      if (key in theme.value.colors) theme.value.colors[key] = colors[key]
    })
  }

  function addPalette(name, description = '') {
    const cleanName = String(name || '').trim()
    if (!cleanName) return false
    const palette = {
      id: `custom-${Date.now()}`,
      name: cleanName,
      description: String(description || '').trim() || 'Paleta personalizada.',
      theme: clone(theme.value),
      custom: true
    }
    savedPalettes.value.push(palette)
    persistPalettes()
    return true
  }

  function deletePalette(id) {
    savedPalettes.value = savedPalettes.value.filter(p => p.id !== id)
    persistPalettes()
  }

  // --- Typography actions ---
  function updateFontFamily(family) {
    theme.value.typography.fontFamily = family
  }

  function updateTypographyLevel(level, prop, value) {
    if (theme.value.typography[level]) {
      theme.value.typography[level][prop] = value
    }
  }

  // --- Button actions ---
  function updateButton(variant, prop, value) {
    if (!theme.value.buttons[variant]) return

    // Estas propiedades definen la estructura común de todos los botones.
    // Solo background, color y borderColor son específicos por variante.
    const sharedProps = ['borderWidth', 'borderStyle', 'borderRadius', 'height', 'paddingX', 'fontWeight']
    if (sharedProps.includes(prop)) {
      Object.keys(theme.value.buttons).forEach(key => {
        theme.value.buttons[key][prop] = value
      })
      return
    }

    theme.value.buttons[variant][prop] = value

    // El botón Eliminar no tiene sección propia: siempre refleja el color
    // primario (background, texto y borde), linkeado y no editable aparte.
    if (variant === 'primary' && ['background', 'color', 'borderColor'].includes(prop)) {
      theme.value.buttons.delete[prop] = value
    }
  }

  // --- Form actions ---
  function updateForm(prop, value) {
    theme.value.forms[prop] = value
  }

  // --- Table actions ---
  function updateTable(prop, value) {
    theme.value.tables[prop] = value
    // Editar el hover manualmente lo desvincula del color primario.
    if (prop === 'rowHoverBackground') {
      theme.value.tables._hoverLinked = false
    }
  }

  // --- State actions ---
  function updateState(stateType, prop, value) {
    if (typeof theme.value.states[stateType] === 'object') {
      theme.value.states[stateType][prop] = value
    } else {
      theme.value.states[stateType] = value
    }
  }

  function updateStateProp(prop, value) {
    theme.value.states[prop] = value
  }

  // --- Modal actions ---
  function updateModal(prop, value) {
    theme.value.modals[prop] = value
  }

  // --- Icon actions ---
  function updateIcon(prop, value) {
    theme.value.icons[prop] = value
  }

  // --- Layout actions ---
  function updateLayout(section, prop, value) {
    if (section === 'globalBorderRadius') {
      theme.value.layout.borderRadiusGlobal = value
    } else if (theme.value.layout[section]) {
      theme.value.layout[section][prop] = value
      // Editar el fondo o el color de icono del sidebar a mano los
      // desvincula del color secundario / del contraste automático.
      if (section === 'sidebar' && prop === 'background') {
        theme.value.layout.sidebar.background = theme.value.colors.secondary
        theme.value.layout.sidebar._bgLinked = true
      }
      if (section === 'sidebar' && prop === 'iconColor') {
        theme.value.layout.sidebar._iconLinked = false
      }
    }
  }

  // --- Error actions ---
  function updateError(errorType, prop, value) {
    if (theme.value.errors[errorType]) {
      theme.value.errors[errorType][prop] = value
    }
  }

  // --- General actions ---
  function resetToDefaults() {
    theme.value = clone(defaultTheme)
  }

  function loadFromObject(obj) {
    theme.value = clone(obj)
  }

  const exportAsJSON = computed(() => {
    return JSON.parse(JSON.stringify(theme.value))
  })

  return {
    theme,
    savedPalettes,
    updateColor,
    applyPalette,
    addPalette,
    deletePalette,
    updateFontFamily,
    updateTypographyLevel,
    updateButton,
    updateForm,
    updateTable,
    updateState,
    updateStateProp,
    updateModal,
    updateIcon,
    updateLayout,
    updateError,
    resetToDefaults,
    loadFromObject,
    exportAsJSON
  }
})
