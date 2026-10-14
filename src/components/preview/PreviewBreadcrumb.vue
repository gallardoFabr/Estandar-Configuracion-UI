<template>
  <nav class="preview-breadcrumb">
    <span>Inicio</span>
    <ChevronRight class="breadcrumb-icon" :size="themeStore.theme.icons.size" :stroke-width="themeStore.theme.icons.strokeWidth" />
    <span class="current">{{ title }}</span>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { useThemeStore } from '@/stores/themeStore.js';
import { screenTitles } from '@/data/menusByRole';
import { ChevronRight } from '@lucide/vue';

const appStore = useAppStore();
const themeStore = useThemeStore();
const title = computed(() => screenTitles[appStore.activeScreen] || 'Dashboard');
</script>

<style scoped>
.preview-breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--theme-text-small-size);
  color: var(--theme-text-secondary);
}
.breadcrumb-icon {
  color: var(--theme-icon-color);
  flex-shrink: 0;
}
.current {
  color: var(--theme-text-primary);
  font-weight: var(--theme-text-small-weight);
}
</style>
