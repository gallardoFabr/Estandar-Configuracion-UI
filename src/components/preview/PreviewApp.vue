<template>
  <div class="preview-app" :class="{ 'is-mobile': appStore.activeDevice === 'mobile' }">
    <PreviewHeader @toggle-sidebar="toggleSidebar" />
    <div class="app-body">
      <PreviewSidebar v-show="appStore.activeDevice !== 'mobile' || isSidebarOpen" />
      <PreviewContent />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAppStore } from '@/stores/appStore';
import PreviewHeader from './PreviewHeader.vue';
import PreviewSidebar from './PreviewSidebar.vue';
import PreviewContent from './PreviewContent.vue';

const appStore = useAppStore();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
.preview-app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--theme-content-bg);
  overflow: hidden;
  position: relative;
}
.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.is-mobile .app-body {
  position: relative;
}
</style>
