<template>
  <div class="app-root">
    <AppHeader />
    <div class="app-body" :class="{ 'review-mode': appStore.activeMode === 'review' }">
      <template v-if="appStore.activeMode === 'decisions'">
        <DecisionsMode />
      </template>
      <template v-else>
        <ConfigSidebar v-if="appStore.activeMode === 'design'" class="app-sidebar" />
        <PreviewContainer class="app-preview" />
        <PropertiesPanel v-if="appStore.activeMode === 'design'" class="app-properties" />
      </template>
    </div>
    <BottomBar />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/appStore.js'
import { useCssVariables } from '@/composables/useCssVariables.js'
import { useLocalStorage } from '@/composables/useLocalStorage.js'
import AppHeader from '@/components/layout/AppHeader.vue'
import ConfigSidebar from '@/components/layout/ConfigSidebar.vue'
import PreviewContainer from '@/components/layout/PreviewContainer.vue'
import PropertiesPanel from '@/components/layout/PropertiesPanel.vue'
import BottomBar from '@/components/layout/BottomBar.vue'
import DecisionsMode from '@/components/modes/DecisionsMode.vue'

const appStore = useAppStore()
useCssVariables()

const { loadConfig, hasStoredConfig } = useLocalStorage()

onMounted(() => {
  if (hasStoredConfig()) {
    loadConfig()
  }
})
</script>

<style>
.app-root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
  overflow: hidden;
  background-color: var(--tool-bg);
}

.app-body {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.app-body.review-mode {
  /* In review mode, preview takes full width */
}

.app-sidebar {
  flex: 0 0 220px;
  height: 100%;
  overflow: hidden;
}

.app-preview {
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.app-properties {
  flex: 0 0 360px;
  min-height: 0;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 1024px) {
  .app-body { flex-wrap: wrap; overflow: auto; }
  .app-properties { width: 100%; max-height: 50vh; border-top: 1px solid var(--tool-border); border-left: none; }
}

@media (max-width: 768px) {
  .app-sidebar {
    display: none;
  }
}
</style>
