<template>
  <main class="preview-container">
    <div class="preview-top-bar">
      <div class="preview-controls">
        <div class="screen-selector">
          <label for="screen-select" class="screen-label">Vista:</label>
          <select id="screen-select" v-model="activeScreenLocal" class="screen-dropdown" @change="onScreenChange">
            <option v-for="screen in screens" :key="screen.id" :value="screen.id">{{ screen.label }}</option>
          </select>
        </div>
        <div class="preview-mode-selector">
          <span class="screen-label">Previsualizar:</span>
          <div class="mode-toggle">
            <button :class="{ active: previewMode === 'page' }" @click="previewMode = 'page'">Página</button>
            <button v-if="componentCategories.includes(appStore.activeCategory)" :class="{ active: previewMode === 'component' }" @click="previewMode = 'component'">Componente</button>
          </div>
        </div>
      </div>
    </div>

    <div class="preview-workspace">
      <div class="device-frame" :class="['device-' + appStore.activeDevice]">
        <PreviewComponentShowcase v-if="previewMode === 'component' && componentCategories.includes(appStore.activeCategory)" :category="appStore.activeCategory" />
        <PreviewApp v-else />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/appStore'
import PreviewApp from '@/components/preview/PreviewApp.vue'
import PreviewComponentShowcase from '@/components/preview/PreviewComponentShowcase.vue'

const appStore = useAppStore()
const componentCategories = ['buttons', 'forms', 'tables', 'states', 'modals', 'icons', 'errors']
const screens = [
  { id: 'estudiantes', label: 'Estudiantes' }, { id: 'matricula', label: 'Matrícula' },
  { id: 'pagos', label: 'Pagos' }, { id: 'asistencia', label: 'Asistencia' },
  { id: 'evaluaciones', label: 'Evaluaciones' }, { id: 'horarios', label: 'Horarios' },
  { id: 'usuarios', label: 'Usuarios' }, { id: 'configuracion', label: 'Configuración' }
]
const activeScreenLocal = ref(appStore.activeScreen || 'estudiantes')
const previewMode = ref(componentCategories.includes(appStore.activeCategory) ? 'component' : 'page')

watch(() => appStore.activeScreen, (newVal) => { if (newVal) activeScreenLocal.value = newVal })
watch(() => appStore.activeCategory, (category) => { previewMode.value = componentCategories.includes(category) ? 'component' : 'page' })
const onScreenChange = () => appStore.setScreen(activeScreenLocal.value)
</script>

<style scoped>
.preview-container { flex: 1; min-width: 0; min-height: 0; display: flex; flex-direction: column; background: #f1f5f9; overflow: hidden; }
.preview-top-bar { flex: 0 0 auto; display: flex; align-items: center; padding: 8px 16px; background: #fff; border-bottom: 1px solid #e2e8f0; }
.preview-controls { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
.screen-selector, .preview-mode-selector { display: flex; align-items: center; gap: 8px; }
.screen-label { font-size: .875rem; font-weight: 500; color: #475569; }
.screen-dropdown { padding: 6px 12px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: .875rem; background: #fff; color: #1e293b; outline: none; cursor: pointer; }
.mode-toggle { display: flex; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden; }
.mode-toggle button { border: 0; background: #fff; color: #64748b; padding: 6px 12px; font-size: 12px; cursor: pointer; }
.mode-toggle button + button { border-left: 1px solid #cbd5e1; }
.mode-toggle button.active { background: var(--theme-primary); color: #fff; }
.preview-workspace { flex: 1; min-height: 0; display: flex; align-items: stretch; justify-content: center; padding: 16px; overflow: hidden; }
.device-frame { background: #fff; transition: all .3s ease; overflow: hidden; display: flex; flex-direction: column; min-height: 0; }
.device-desktop { width: 100%; height: 100%; border-radius: var(--theme-radius-global); box-shadow: 0 4px 6px -1px rgba(0,0,0,.1); border: 1px solid #e2e8f0; }
.device-tablet { width: 100%; max-width: 768px; height: 100%; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,.15); border: 8px solid #cbd5e1; }
.device-mobile { width: 100%; max-width: 375px; height: 100%; border-radius: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,.15); border: 12px solid #334155; }
</style>
