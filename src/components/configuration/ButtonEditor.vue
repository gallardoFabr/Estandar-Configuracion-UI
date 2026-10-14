<template>
  <div class="editor-panel">
    <div class="section">
      <h3 class="section-title">Tipo de botón</h3>
      <div class="tabs">
        <button v-for="tab in buttonTabs" :key="tab.value" class="tab-btn" :class="{ active: activeTab === tab.value }" @click="selectTab(tab.value)">
          {{ tab.label }}
        </button>
      </div>
      <p class="helper">Elige el tipo de botón para configurar sus colores. Borde, radio, altura y padding son comunes a todos los tipos. La tipografía de los botones utiliza Texto normal.</p>
      <p v-if="activeTab === 'cancel'" class="helper linked-note">El botón <strong>Reintentar</strong> utiliza el mismo estilo del botón Cancelar y ambos están vinculados al color de Error de la paleta.</p>
      <p v-if="activeTab === 'primary'" class="helper linked-note">El botón <strong>Eliminar</strong> no tiene una sección propia: siempre usa el mismo color primario configurado aquí (linkeado, no se edita por separado).</p>
    </div>

    <div class="section" v-if="currentConfig">
      <h3 class="section-title">Colores y estructura</h3>
      <div class="controls-grid">
        <ColorPicker v-model="bgColor" label="Background" />
        <ColorPicker v-model="textColor" label="Color del texto" />
        <div class="border-config">
          <div class="border-heading"><span>Borde (común)</span><span class="border-preview" :style="{ border: borderCss }"></span></div>
          <div class="border-fields">
            <div class="mini-field"><label>Ancho</label><input type="number" v-model.number="borderWidth" min="0" max="8" step="1" /></div>
            <div class="mini-field"><label>Estilo</label><select v-model="borderStyle"><option value="solid">Sólido</option><option value="dashed">Guiones</option><option value="dotted">Punteado</option><option value="none">Ninguno</option></select></div>
          </div>
          <ColorPicker v-if="borderStyle !== 'none'" v-model="borderColor" label="Color del borde" />
        </div>
        <SliderControl v-model="borderRadius" label="Border radius (común)" :min="0" :max="24" unit="px" />
        <SliderControl v-model="height" label="Altura (común)" :min="30" :max="60" unit="px" />
        <SliderControl v-model="paddingX" label="Padding horizontal (común)" :min="8" :max="40" unit="px" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore.js'
import { useAppStore } from '@/stores/appStore.js'
import ColorPicker from '@/components/common/ColorPicker.vue'
import SliderControl from '@/components/common/SliderControl.vue'

const themeStore = useThemeStore()
const appStore = useAppStore()
const buttonTabs = [
  { value: 'primary', label: 'Primario' }, { value: 'secondary', label: 'Secundario' },
  { value: 'cancel', label: 'Cancelar' }, { value: 'disabled', label: 'Deshabilitado' }
]
const activeTab = computed({ get: () => appStore.componentSelection.buttons, set: val => appStore.setComponentSelection('buttons', val) })
const currentConfig = computed(() => themeStore.theme.buttons[activeTab.value])
const bind = prop => computed({ get: () => themeStore.theme.buttons[activeTab.value]?.[prop], set: val => themeStore.updateButton(activeTab.value, prop, val) })
const sharedConfig = computed(() => themeStore.theme.buttons.primary || themeStore.theme.buttons[activeTab.value])
const sharedBind = prop => computed({ get: () => sharedConfig.value?.[prop], set: val => themeStore.updateButton('primary', prop, val) })
const bgColor = bind('background'), textColor = bind('color')
const borderRadius = sharedBind('borderRadius'), height = sharedBind('height'), paddingX = sharedBind('paddingX')
const borderWidth = computed({ get: () => sharedConfig.value?.borderWidth ?? (parseInt(sharedConfig.value?.border || '1', 10) || 0), set: val => themeStore.updateButton('primary','borderWidth',val) })
const borderStyle = computed({ get: () => sharedConfig.value?.borderStyle ?? (sharedConfig.value?.border === 'none' ? 'none' : 'solid'), set: val => themeStore.updateButton('primary','borderStyle',val) })
const borderColor = computed({ get: () => currentConfig.value?.borderColor ?? '#2563EB', set: val => themeStore.updateButton(activeTab.value,'borderColor',val) })
const borderCss = computed(() => borderStyle.value === 'none' || borderWidth.value === 0 ? 'none' : `${borderWidth.value}px ${borderStyle.value} ${borderColor.value}`)
const selectTab = val => appStore.setComponentSelection('buttons', val)
</script>

<style scoped>
.editor-panel{display:flex;flex-direction:column;gap:24px;padding:16px}.section{display:flex;flex-direction:column;gap:12px}.section-title{font-size:14px;font-weight:600;color:var(--tool-text,#334155);margin:0}.tabs{display:flex;flex-wrap:wrap;gap:8px}.tab-btn{padding:7px 11px;background:#fff;border:1px solid #d1d5db;border-radius:6px;font-size:12px;cursor:pointer;color:#475569}.tab-btn.active{background:#eff6ff;border-color:var(--tool-accent,#2563eb);color:var(--tool-accent,#2563eb);font-weight:600}.controls-grid{display:grid;grid-template-columns:1fr;gap:14px}.helper{font-size:12px;color:#64748b;line-height:1.45}.linked-note{margin-top:2px;padding:8px 10px;background:#eff6ff;border:1px solid #dbeafe;border-radius:6px;color:#1e40af}.border-config{display:flex;flex-direction:column;gap:10px}.border-heading{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:500;color:#475569}.border-preview{width:44px;height:18px;border-radius:4px;background:#fff}.border-fields{display:grid;grid-template-columns:1fr 1.4fr;gap:8px}.mini-field{display:flex;flex-direction:column;gap:5px}.mini-field label{font-size:11px;color:#64748b}.mini-field input,.mini-field select{height:30px;border:1px solid #d1d5db;border-radius:5px;padding:0 8px;font-size:12px;background:#fff;color:#334155}.mini-field input:focus,.mini-field select:focus{outline:none;border-color:var(--tool-accent,#2563eb)}
</style>