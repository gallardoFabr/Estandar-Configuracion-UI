<template>
  <div class="editor-panel">
    <div class="section">
      <h3 class="section-title">Paletas predefinidas</h3>
      <p class="helper">Al aplicar una paleta se reemplaza el estándar completo: colores, tipografía, botones, formularios, tablas, estados, modales, iconografía, layout y errores.</p>

      <div class="palettes-grid">
        <div v-for="palette in predefinedPalettes" :key="palette.id" class="palette-card">
          <div class="palette-header">
            <div>
              <h4>{{ palette.name }}</h4>
              <p>{{ palette.description }}</p>
            </div>
            <span class="palette-badge">Predefinida</span>
          </div>
          <div class="palette-colors">
            <div
              v-for="item in colorItems"
              :key="item.key"
              class="color-swatch"
              :title="`${item.label}: ${palette.theme.colors[item.key]}`"
            >
              <span class="color-circle" :style="{ backgroundColor: palette.theme.colors[item.key] }"></span>
              <span class="swatch-label">{{ item.label }}</span>
            </div>
          </div>
          <button class="apply-btn" type="button" @click="themeStore.applyPalette(palette)">
            Aplicar paleta
          </button>
        </div>
      </div>
    </div>

    <div class="section">
      <h3 class="section-title">Paletas guardadas</h3>
      <p v-if="!themeStore.savedPalettes.length" class="empty-text">Todavía no tienes paletas personalizadas.</p>
      <div v-else class="palettes-grid">
        <div v-for="palette in themeStore.savedPalettes" :key="palette.id" class="palette-card custom-card">
          <div class="palette-header">
            <div>
              <h4>{{ palette.name }}</h4>
              <p>{{ palette.description }}</p>
            </div>
            <span class="palette-badge custom">Personalizada</span>
          </div>
          <div class="palette-colors">
            <div
              v-for="item in colorItems"
              :key="item.key"
              class="color-swatch"
              :title="`${item.label}: ${palette.theme.colors[item.key]}`"
            >
              <span class="color-circle" :style="{ backgroundColor: palette.theme.colors[item.key] }"></span>
              <span class="swatch-label">{{ item.label }}</span>
            </div>
          </div>
          <div class="custom-actions">
            <button class="apply-btn" type="button" @click="themeStore.applyPalette(palette)">Aplicar paleta</button>
            <button class="delete-btn" type="button" @click="themeStore.deletePalette(palette.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="add-palette-box">
      <div>
        <h3 class="section-title">Agregar nueva paleta</h3>
        <p class="helper">Guarda una copia de toda la configuración actual para reutilizarla posteriormente.</p>
      </div>
      <div v-if="showAddForm" class="palette-form">
        <div class="form-field">
          <label for="palette-name">Nombre</label>
          <input id="palette-name" v-model="newPaletteName" type="text" placeholder="Ej. Propuesta Product Owner" maxlength="50" />
        </div>
        <div class="form-field">
          <label for="palette-description">Descripción</label>
          <input id="palette-description" v-model="newPaletteDescription" type="text" placeholder="Descripción breve" maxlength="120" />
        </div>
        <div class="form-actions">
          <button class="secondary-action" type="button" @click="cancelAddPalette">Cancelar</button>
          <button class="save-action" type="button" :disabled="!newPaletteName.trim()" @click="savePalette">Guardar paleta</button>
        </div>
      </div>
      <button v-else class="add-palette-btn" type="button" @click="showAddForm = true">＋ Agregar nueva paleta</button>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h3 class="section-title">Colores individuales</h3>
      <div class="controls-grid">
        <ColorPicker v-model="primary" label="Primario" :default-value="defaultTheme.colors.primary" />
        <ColorPicker v-model="secondary" label="Secundario" :default-value="defaultTheme.colors.secondary" />
        <ColorPicker v-model="success" label="Éxito" :default-value="defaultTheme.colors.success" />
        <ColorPicker v-model="warning" label="Advertencia" :default-value="defaultTheme.colors.warning" />
        <ColorPicker v-model="error" label="Error" :default-value="defaultTheme.colors.error" />
        <ColorPicker v-model="info" label="Información" :default-value="defaultTheme.colors.info" />
        <ColorPicker v-model="background" label="Fondo" :default-value="defaultTheme.colors.background" />
        <ColorPicker v-model="textPrimary" label="Texto principal" :default-value="defaultTheme.colors.textPrimary" />
        <ColorPicker v-model="textSecondary" label="Texto secundario" :default-value="defaultTheme.colors.textSecondary" />
      </div>
    </div>

    <div class="section usage-section">
      <h3 class="section-title">Uso de cada color</h3>
      <p class="helper">Cada color está linkeado a su uso correspondiente: al cambiarlo aquí arriba, se actualiza automáticamente en todas las secciones relacionadas.</p>
      <div class="usage-table">
        <div class="usage-row usage-head">
          <span>Elemento</span><span>Color</span><span>Código HEX</span><span>Uso</span>
        </div>
        <div v-for="item in colorItems" :key="item.key" class="usage-row">
          <span class="usage-name"><i :style="{ backgroundColor: themeStore.theme.colors[item.key] }"></i>{{ item.label }}</span>
          <span>{{ item.colorName }}</span>
          <code>{{ themeStore.theme.colors[item.key] }}</code>
          <span>{{ item.usage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useThemeStore } from '@/stores/themeStore.js'
import ColorPicker from '@/components/common/ColorPicker.vue'
import { defaultTheme } from '@/data/defaultTheme.js'
import { palettes } from '@/data/palettes.js'

const themeStore = useThemeStore()
const predefinedPalettes = palettes
const showAddForm = ref(false)
const newPaletteName = ref('')
const newPaletteDescription = ref('')

const colorItems = [
  { key: 'primary', label: 'Primario', colorName: 'Celeste', usage: 'Botones principales, elementos seleccionados, enlaces y componentes destacados.' },
  { key: 'secondary', label: 'Secundario', colorName: 'Azul oscuro', usage: 'Encabezados, navegación principal y elementos que requieren mayor contraste.' },
  { key: 'success', label: 'Éxito', colorName: 'Verde', usage: 'Operaciones correctas, estados activos o pagos realizados.' },
  { key: 'warning', label: 'Advertencia', colorName: 'Naranja', usage: 'Situaciones que requieren atención, como pagos pendientes.' },
  { key: 'error', label: 'Error', colorName: 'Rojo', usage: 'Errores, acciones destructivas, información inválida o estados críticos.' },
  { key: 'info', label: 'Información', colorName: 'Celeste claro', usage: 'Mensajes informativos y acciones que no representan éxito ni error.' },
  { key: 'background', label: 'Fondo', colorName: 'Gris muy claro', usage: 'Fondo general de las páginas y áreas de contenido.' },
  { key: 'textPrimary', label: 'Texto principal', colorName: 'Azul oscuro', usage: 'Títulos, información principal y contenido relevante.' },
  { key: 'textSecondary', label: 'Texto secundario', colorName: 'Gris', usage: 'Descripciones, información complementaria y datos secundarios.' }
]

const createColorComputed = (key) => computed({
  get: () => themeStore.theme.colors[key],
  set: (val) => themeStore.updateColor(key, val)
})

const primary = createColorComputed('primary')
const secondary = createColorComputed('secondary')
const success = createColorComputed('success')
const warning = createColorComputed('warning')
const error = createColorComputed('error')
const info = createColorComputed('info')
const background = createColorComputed('background')
const textPrimary = createColorComputed('textPrimary')
const textSecondary = createColorComputed('textSecondary')

const savePalette = () => {
  if (!newPaletteName.value.trim()) return
  themeStore.addPalette(newPaletteName.value, newPaletteDescription.value)
  cancelAddPalette()
}

const cancelAddPalette = () => {
  showAddForm.value = false
  newPaletteName.value = ''
  newPaletteDescription.value = ''
}
</script>

<style scoped>
.editor-panel{display:flex;flex-direction:column;gap:24px;padding:16px}.section{display:flex;flex-direction:column;gap:12px}.section-title{font-size:14px;font-weight:600;color:var(--tool-text,#334155);margin:0}.helper{margin:0;font-size:12px;line-height:1.45;color:#64748b}.palettes-grid{display:flex;flex-direction:column;gap:12px}.palette-card{border:1px solid #e5e7eb;border-radius:8px;padding:12px;background:#fff;display:flex;flex-direction:column;gap:12px}.custom-card{border-style:dashed}.palette-header{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}.palette-header h4{margin:0 0 4px;font-size:13px;font-weight:600;color:#111}.palette-header p{margin:0;font-size:12px;color:#666;line-height:1.4}.palette-badge{flex-shrink:0;padding:3px 6px;border-radius:999px;background:#eef2ff;color:#4f46e5;font-size:10px;font-weight:600}.palette-badge.custom{background:#ecfdf5;color:#047857}.palette-colors{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.color-swatch{display:flex;align-items:center;gap:5px;min-width:0}.color-circle{width:18px;height:18px;border-radius:50%;border:1px solid rgba(0,0,0,.1);flex-shrink:0}.swatch-label{font-size:10px;color:#64748b;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.apply-btn,.add-palette-btn,.save-action,.secondary-action,.delete-btn{border-radius:6px;font-size:12px;font-weight:500;cursor:pointer}.apply-btn{background:#f3f4f6;border:1px solid #d1d5db;padding:6px 12px;color:#374151}.apply-btn:hover{background:#e5e7eb}.custom-actions{display:flex;gap:8px}.custom-actions .apply-btn{flex:1}.delete-btn{padding:6px 10px;background:#fff;border:1px solid #fecaca;color:#dc2626}.delete-btn:hover{background:#fef2f2}.add-palette-box{display:flex;flex-direction:column;gap:12px;padding:14px;border:1px dashed #cbd5e1;border-radius:8px;background:#f8fafc}.add-palette-btn{align-self:stretch;padding:9px 12px;background:#fff;border:1px solid #cbd5e1;color:#334155}.add-palette-btn:hover{border-color:#94a3b8;background:#f8fafc}.palette-form{display:flex;flex-direction:column;gap:10px}.form-field{display:flex;flex-direction:column;gap:5px}.form-field label{font-size:11px;color:#475569;font-weight:600}.form-field input{height:34px;border:1px solid #cbd5e1;border-radius:5px;padding:0 9px;font-size:12px;color:#334155;background:#fff}.form-field input:focus{outline:none;border-color:var(--tool-accent,#2563eb)}.form-actions{display:flex;justify-content:flex-end;gap:8px}.secondary-action{padding:7px 10px;background:#fff;border:1px solid #cbd5e1;color:#475569}.save-action{padding:7px 12px;background:var(--tool-accent,#2563eb);border:1px solid var(--tool-accent,#2563eb);color:#fff}.save-action:disabled{background:#cbd5e1;border-color:#cbd5e1;color:#fff;cursor:not-allowed}.empty-text{margin:0;padding:10px 12px;border:1px dashed #e2e8f0;border-radius:6px;color:#64748b;font-size:12px}.divider{height:1px;background:#e5e7eb;width:100%}.controls-grid{display:grid;grid-template-columns:1fr;gap:12px}.usage-section{gap:10px}.usage-table{border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;background:#fff}.usage-row{display:grid;grid-template-columns:1.1fr .9fr 1fr 2.5fr;gap:8px;align-items:center;padding:9px 10px;border-bottom:1px solid #e2e8f0;font-size:11px;color:#475569;line-height:1.35}.usage-row:last-child{border-bottom:none}.usage-head{font-weight:700;background:#f8fafc;color:#334155}.usage-name{display:flex;align-items:center;gap:6px;font-weight:600;color:#334155}.usage-name i{width:13px;height:13px;border-radius:50%;border:1px solid rgba(0,0,0,.1);display:inline-block}.usage-row code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;color:#334155}.usage-row span:last-child{color:#64748b}@media(max-width:800px){.usage-row{grid-template-columns:1fr 1fr}.usage-head{display:none}.usage-row span:last-child{grid-column:1/-1}.palette-colors{grid-template-columns:repeat(2,1fr)}}
</style>
