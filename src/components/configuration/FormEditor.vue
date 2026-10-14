<template>
  <div class="editor-panel">
    <div class="section"><h3 class="section-title">Estado de previsualización</h3><SelectControl v-model="previewState" label="Estado" :options="stateOptions" /><p class="helper">El estado seleccionado se refleja en el componente central.</p></div>
    <div class="divider"></div>
    <div class="section"><h3 class="section-title">Apariencia</h3><div class="controls-grid">
      <ColorPicker v-model="bg" label="Fondo del input" />
      <ColorPicker v-model="borderColor" label="Borde del input" />
      <ColorPicker v-model="focusBorder" label="Borde en foco" />
      <ColorPicker v-model="errorBorder" label="Borde de error" />
      <ColorPicker v-model="labelColor" label="Color del label" />
      <ColorPicker v-model="errorColor" label="Color del mensaje de error" />
      <SliderControl v-model="borderRadius" label="Border radius" :min="0" :max="16" unit="px" />
      <SliderControl v-model="height" label="Altura" :min="32" :max="56" unit="px" />
      <SliderControl v-model="paddingX" label="Padding horizontal" :min="8" :max="20" unit="px" />
      <SliderControl v-model="fontSize" label="Tamaño del texto" :min="12" :max="18" unit="px" />
      <SliderControl v-model="labelSize" label="Tamaño del label" :min="11" :max="16" unit="px" />
    </div></div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore.js'
import { useAppStore } from '@/stores/appStore.js'
import ColorPicker from '@/components/common/ColorPicker.vue'; import SliderControl from '@/components/common/SliderControl.vue'; import SelectControl from '@/components/common/SelectControl.vue'
const themeStore=useThemeStore(), appStore=useAppStore()
const stateOptions=[{value:'normal',label:'Normal'},{value:'error',label:'Error'},{value:'required',label:'Obligatorio'},{value:'disabled',label:'Deshabilitado'}]
const previewState=computed({get:()=>appStore.componentSelection.forms,set:v=>appStore.setComponentSelection('forms',v)})
const bind=p=>computed({get:()=>themeStore.theme.forms[p],set:v=>themeStore.updateForm(p,v)})
const bg=bind('background'), borderColor=bind('borderColor'), focusBorder=bind('focusBorderColor'), errorBorder=bind('errorBorderColor'), labelColor=bind('labelColor'), errorColor=bind('errorColor'), borderRadius=bind('borderRadius'), height=bind('height'), paddingX=bind('paddingX'), fontSize=bind('fontSize'), labelSize=bind('labelSize')
</script>
<style scoped>
.editor-panel{display:flex;flex-direction:column;gap:24px;padding:16px}.section{display:flex;flex-direction:column;gap:12px}.section-title{font-size:14px;font-weight:600;color:var(--tool-text,#334155);margin:0}.divider{height:1px;background:#e5e7eb;width:100%}.controls-grid{display:grid;grid-template-columns:1fr;gap:14px}.helper{font-size:12px;color:#64748b;line-height:1.45}
</style>