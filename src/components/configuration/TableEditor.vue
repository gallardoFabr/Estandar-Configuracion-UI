<template>
  <div class="editor-panel"><div class="section"><h3 class="section-title">Apariencia de la tabla</h3><div class="controls-grid">
    <ColorPicker v-model="headerBg" label="Color del encabezado" /><ColorPicker v-model="headerText" label="Color de texto del encabezado" /><ColorPicker v-model="rowBg" label="Color de filas" /><ColorPicker v-model="rowAltBg" label="Color alterno de filas" /><ColorPicker v-model="hoverBg" label="Color hover" /><ColorPicker v-model="borderColor" label="Color de bordes" />
    <SliderControl v-model="borderRadius" label="Border radius" :min="0" :max="16" unit="px" /><SliderControl v-model="rowHeight" label="Altura de filas" :min="36" :max="64" unit="px" />
  </div><p class="helper">El texto de las celdas utiliza el nivel de Texto normal definido en Tipografía.</p></div></div>
</template>
<script setup>
import {computed} from 'vue';import {useThemeStore} from '@/stores/themeStore.js';import ColorPicker from '@/components/common/ColorPicker.vue';import SliderControl from '@/components/common/SliderControl.vue'
const t=useThemeStore();const b=p=>computed({get:()=>t.theme.tables[p],set:v=>t.updateTable(p,v)});const headerBg=b('headerBackground'),headerText=b('headerColor'),rowBg=b('rowBackground'),rowAltBg=b('rowAlternateBackground'),hoverBg=b('rowHoverBackground'),borderColor=b('borderColor'),borderRadius=b('borderRadius'),rowHeight=b('rowHeight')
</script>
<style scoped>.editor-panel{display:flex;flex-direction:column;gap:24px;padding:16px}.section{display:flex;flex-direction:column;gap:12px}.section-title{font-size:14px;font-weight:600;color:var(--tool-text,#334155);margin:0}.controls-grid{display:grid;grid-template-columns:1fr;gap:14px}.helper{font-size:12px;color:#64748b;line-height:1.45}</style>