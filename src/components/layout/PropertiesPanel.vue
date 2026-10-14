<template>
  <aside class="properties-panel">
    <div class="panel-header">
      <component :is="activeIcon" class="header-icon" />
      <h2 class="header-title">{{ activeCategoryLabel }}</h2>
    </div>

    <div class="editor-container">
      <component :is="currentEditor" v-if="currentEditor" />
    </div>

    <div class="decision-section">
      <DecisionMarker 
        :model-value="decisionStore.getCategoryStatus(appStore.activeCategory)" 
        @update:model-value="val => decisionStore.setCategoryStatus(appStore.activeCategory, val)"
      />
      <CommentBox 
        :model-value="decisionStore.getCategoryComment(appStore.activeCategory)" 
        @update:model-value="val => decisionStore.setCategoryComment(appStore.activeCategory, val)"
      />
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useDecisionStore } from '@/stores/decisionStore'
import {
  Palette, Type, MousePointerClick, FileText,
  Table, AlertCircle, Maximize2, Search, Layout, AlertTriangle
} from '@lucide/vue'

import ColorEditor from '@/components/configuration/ColorEditor.vue'
import TypographyEditor from '@/components/configuration/TypographyEditor.vue'
import ButtonEditor from '@/components/configuration/ButtonEditor.vue'
import FormEditor from '@/components/configuration/FormEditor.vue'
import TableEditor from '@/components/configuration/TableEditor.vue'
import StateEditor from '@/components/configuration/StateEditor.vue'
import ModalEditor from '@/components/configuration/ModalEditor.vue'
import IconEditor from '@/components/configuration/IconEditor.vue'
import LayoutEditor from '@/components/configuration/LayoutEditor.vue'
import ErrorEditor from '@/components/configuration/ErrorEditor.vue'
import DecisionMarker from '@/components/common/DecisionMarker.vue'
import CommentBox from '@/components/common/CommentBox.vue'

const appStore = useAppStore()
const decisionStore = useDecisionStore()

const iconMap = {
  Palette, Type, MousePointerClick, FileText, Table, AlertCircle, Maximize2, Search, Layout, AlertTriangle
}

const activeCategoryObj = computed(() => {
  return appStore.categories.find(c => c.id === appStore.activeCategory) || {}
})

const activeIcon = computed(() => {
  return iconMap[activeCategoryObj.value.icon] || Layout
})

const activeCategoryLabel = computed(() => {
  return activeCategoryObj.value.label || 'Configuración'
})

const editorMap = {
  colors: ColorEditor,
  typography: TypographyEditor,
  buttons: ButtonEditor,
  forms: FormEditor,
  tables: TableEditor,
  states: StateEditor,
  modals: ModalEditor,
  icons: IconEditor,
  layout: LayoutEditor,
  errors: ErrorEditor
}

const currentEditor = computed(() => {
  return editorMap[appStore.activeCategory] || null
})
</script>

<style scoped>
.properties-panel {
  width: 360px;
  background-color: #ffffff;
  border-left: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

.header-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  color: #64748b;
}

.header-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
}

.editor-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
}

.decision-section {
  flex-shrink: 0;
  padding: 8px 12px;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
