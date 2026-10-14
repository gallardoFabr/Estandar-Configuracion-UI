<template>
  <div class="editor-panel">
    <div class="section">
      <h3 class="section-title">Sidebar</h3>
      <div class="controls-grid">
        <SliderControl v-model="sidebarWidth" label="Ancho" :min="180" :max="320" unit="px" />
        <div class="linked-value"><span>Fondo</span><strong>Color secundario</strong></div>
        <ColorPicker v-model="sidebarIconColor" label="Color de iconos" />
        <SliderControl v-model="sidebarRadius" label="Border radius" :min="0" :max="16" unit="px" />
        <SliderControl v-model="sidebarSpacing" label="Espaciado" :min="0" :max="12" unit="px" />
      </div>
      <p class="info-text">El fondo del sidebar está vinculado al color Secundario de la paleta. Al cambiar Secundario, el sidebar se actualiza automáticamente. El color de los iconos permanece como una propiedad visual independiente.</p>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h3 class="section-title">Header</h3>
      <div class="controls-grid">
        <SliderControl v-model="headerHeight" label="Altura" :min="40" :max="80" unit="px" />
        <ColorPicker v-model="headerBg" label="Fondo" />
        <div class="checkbox-group">
          <label><input type="checkbox" v-model="headerLogo" /> Mostrar logo</label>
          <label><input type="checkbox" v-model="headerNotif" /> Mostrar notificaciones</label>
          <label><input type="checkbox" v-model="headerUser" /> Mostrar usuario</label>
        </div>
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h3 class="section-title">Contenido</h3>
      <div class="controls-grid">
        <ColorPicker v-model="contentBg" label="Fondo" />
        <SliderControl v-model="contentPadding" label="Padding" :min="8" :max="48" unit="px" />
        <SliderControl v-model="contentMaxWidth" label="Ancho máximo" :min="800" :max="1600" unit="px" />
      </div>
    </div>

    <div class="divider"></div>

    <div class="section">
      <h3 class="section-title">Border radius global</h3>
      <div class="controls-grid">
        <SliderControl v-model="globalRadius" label="Border radius" :min="0" :max="24" unit="px" />
        <p class="info-text">Este valor afecta el radio de esquinas de componentes que utilicen el valor global.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore.js'
import ColorPicker from '@/components/common/ColorPicker.vue'
import SliderControl from '@/components/common/SliderControl.vue'

const themeStore = useThemeStore()

const createBoundProp = (section, prop) => {
  return computed({
    get: () => themeStore.theme.layout[section][prop],
    set: (val) => themeStore.updateLayout(section, prop, val)
  })
}

// Sidebar
const sidebarWidth = createBoundProp('sidebar', 'width')
const sidebarIconColor = createBoundProp('sidebar', 'iconColor')
const sidebarRadius = createBoundProp('sidebar', 'borderRadius')
const sidebarSpacing = createBoundProp('sidebar', 'spacing')

// Header
const headerHeight = createBoundProp('header', 'height')
const headerBg = createBoundProp('header', 'background')
const headerLogo = createBoundProp('header', 'showLogo')
const headerNotif = createBoundProp('header', 'showNotifications')
const headerUser = createBoundProp('header', 'showUser')

// Content
const contentBg = createBoundProp('content', 'background')
const contentPadding = createBoundProp('content', 'padding')
const contentMaxWidth = createBoundProp('content', 'maxWidth')

// Global
const globalRadius = computed({
  get: () => themeStore.theme.layout.borderRadiusGlobal,
  set: (val) => themeStore.updateLayout('globalBorderRadius', null, val)
})
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

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #4b5563;
  cursor: pointer;
}

.linked-value{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border:1px solid #e5e7eb;border-radius:6px;background:#f8fafc;font-size:12px;color:#475569}.linked-value strong{color:var(--tool-accent,#2563eb);font-weight:600}.info-text {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}
</style>
