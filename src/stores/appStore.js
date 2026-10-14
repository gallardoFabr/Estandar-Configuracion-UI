import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const activeMode = ref('design') // 'design' | 'review' | 'decisions'
  const activeCategory = ref('colors') // 'colors' | 'typography' | 'buttons' | etc.
  const activeRole = ref('administrador')
  const activeDevice = ref('desktop') // 'desktop' | 'tablet' | 'mobile'
  const activeScreen = ref('estudiantes')
  const componentSelection = ref({ buttons: 'primary', forms: 'normal', states: 'success', modals: 'confirm', errors: 'validation' })

  const categories = [
    { id: 'colors', label: 'Colores', icon: 'Palette' },
    { id: 'typography', label: 'Tipografía', icon: 'Type' },
    { id: 'buttons', label: 'Botones', icon: 'MousePointerClick' },
    { id: 'forms', label: 'Formularios', icon: 'FileText' },
    { id: 'tables', label: 'Tablas', icon: 'Table' },
    { id: 'states', label: 'Estados', icon: 'AlertCircle' },
    { id: 'modals', label: 'Modales', icon: 'Maximize2' },
    { id: 'icons', label: 'Iconografía', icon: 'Search' },
    { id: 'layout', label: 'Layout', icon: 'Layout' },
    { id: 'errors', label: 'Errores', icon: 'AlertTriangle' }
  ]

  const roles = [
    { id: 'administrador', label: 'Administrador' },
    { id: 'docente', label: 'Docente' },
    { id: 'alumno', label: 'Alumno' },
    { id: 'apoderado', label: 'Apoderado' }
  ]

  const devices = [
    { id: 'desktop', label: 'Desktop', icon: 'Monitor' },
    { id: 'tablet', label: 'Tablet', icon: 'Tablet' },
    { id: 'mobile', label: 'Mobile', icon: 'Smartphone' }
  ]

  function setMode(mode) {
    activeMode.value = mode
  }

  function setCategory(category) {
    activeCategory.value = category
  }

  function setRole(role) {
    activeRole.value = role
  }

  function setDevice(device) {
    activeDevice.value = device
  }

  function setScreen(screen) {
    activeScreen.value = screen
  }

  function setComponentSelection(category, value) {
    componentSelection.value[category] = value
  }

  return {
    activeMode,
    activeCategory,
    activeRole,
    activeDevice,
    activeScreen,
    componentSelection,
    categories,
    roles,
    devices,
    setMode,
    setCategory,
    setRole,
    setDevice,
    setScreen,
    setComponentSelection
  }
})
