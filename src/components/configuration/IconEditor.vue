<template>
  <div class="editor-panel">
    <div class="section">
      <h3 class="section-title">Propiedades globales</h3>
      <div class="controls-grid">
        <SliderControl v-model="size" label="Tamaño" :min="16" :max="48" unit="px" />
        <SliderControl v-model="strokeWidth" label="Grosor" :min="1" :max="3" :step="0.5" unit="px" />
        <ColorPicker v-model="color" label="Color" />
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h3 class="section-title">Galería de iconos</h3>
      <div class="icon-grid">
        <div 
          v-for="(iconComp, name) in iconsList" 
          :key="name"
          class="icon-item"
        >
          <component 
            :is="iconComp" 
            :size="size" 
            :stroke-width="strokeWidth" 
            :color="color" 
          />
          <span class="icon-name">{{ name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore.js'
import ColorPicker from '@/components/common/ColorPicker.vue'
import SliderControl from '@/components/common/SliderControl.vue'

import { 
  Home, Users, GraduationCap, ClipboardList, CreditCard, 
  ClipboardCheck, BarChart3, Calendar, Settings, Pencil, 
  Trash2, Eye, Search, Plus, Download, LogOut,
  Save, ArrowLeft, Info, TriangleAlert, CircleX, CircleCheckBig,
  BookOpen, FileText, UserCog, CircleAlert
} from '@lucide/vue'

const themeStore = useThemeStore()

const iconsList = {
  Home, Users, GraduationCap, ClipboardList, CreditCard, 
  ClipboardCheck, BarChart3, Calendar, Settings, Pencil, 
  Trash2, Eye, Search, Plus, Download, LogOut,
  Save, ArrowLeft, Info, TriangleAlert, CircleX, CircleCheckBig, BookOpen,
  FileText, UserCog, CircleAlert
}

const createBoundProp = (prop) => {
  return computed({
    get: () => themeStore.theme.icons[prop],
    set: (val) => themeStore.updateIcon(prop, val)
  })
}

const size = createBoundProp('size')
const strokeWidth = createBoundProp('strokeWidth')
const color = createBoundProp('color')
</script>

<style scoped>
.editor-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
  width: 100%;
}

.controls-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 16px;
  background: #f9fafb;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: white;
  border-radius: 6px;
  border: 1px solid #f3f4f6;
}

.icon-name {
  font-size: 11px;
  color: #6b7280;
  text-align: center;
  word-break: break-all;
}
</style>
