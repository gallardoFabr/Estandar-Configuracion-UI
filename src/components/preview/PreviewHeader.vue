<template>
  <header class="preview-header">
    <div class="header-left">
      <button class="menu-toggle" @click="$emit('toggle-sidebar')" v-if="appStore.activeDevice === 'mobile'">
        <MenuIcon />
      </button>
      <div v-if="showLogo" class="logo">
        <GraduationCap class="logo-icon" />
        <span class="logo-text">Colegio</span><span class="school-tag">Secundaria</span>
      </div>
    </div>
    <div class="header-center">
      <div class="search-bar">
        <Search class="search-icon" />
        <input type="text" placeholder="Buscar..." />
      </div>
    </div>
    <div class="header-right">
      <button v-if="showNotifications" class="bell-btn">
        <Bell class="bell-icon" />
      </button>
      <div v-if="showUser" class="avatar">AM</div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { useThemeStore } from '@/stores/themeStore.js';
import { Menu as MenuIcon, GraduationCap, Search, Bell } from '@lucide/vue';

const appStore = useAppStore();
const themeStore = useThemeStore();
const showLogo = computed(() => themeStore.theme.layout.header.showLogo);
const showNotifications = computed(() => themeStore.theme.layout.header.showNotifications);
const showUser = computed(() => themeStore.theme.layout.header.showUser);
defineEmits(['toggle-sidebar']);
</script>

<style scoped>
.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--theme-header-height);
  background-color: var(--theme-header-bg);
  border-bottom: 1px solid var(--theme-table-border-color);
  padding: 0 1rem;
  color: var(--theme-text-primary);
  font-family: var(--theme-font-family);
}
.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.menu-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--theme-text-normal-size);
  font-weight: var(--theme-text-normal-weight);
  color: var(--theme-primary);
}
.school-tag {
  font-size: var(--theme-text-small-size);
  font-weight: var(--theme-text-small-weight);
  color: var(--theme-secondary);
  background: color-mix(in srgb, var(--theme-secondary) 10%, transparent);
  padding: 3px 6px;
  border-radius: 999px;
}
.logo-icon {
  width: var(--theme-icon-size);
  height: var(--theme-icon-size);
  stroke-width: var(--theme-icon-stroke-width);
}
.header-center .search-bar {
  display: flex;
  align-items: center;
  background: var(--theme-content-bg);
  border: 1px solid var(--theme-table-border-color);
  border-radius: var(--theme-radius-base);
  padding: 0.25rem 0.5rem;
  gap: 0.5rem;
}
.search-bar input {
  border: none;
  background: none;
  outline: none;
  color: var(--theme-text-primary);
  font-family: var(--theme-font-family);
}
.search-icon {
  width: var(--theme-icon-size);
  height: var(--theme-icon-size);
  stroke-width: var(--theme-icon-stroke-width);
  color: var(--theme-icon-color);
}
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.bell-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--theme-icon-color);
}
.bell-icon {
  width: var(--theme-icon-size);
  height: var(--theme-icon-size);
  stroke-width: var(--theme-icon-stroke-width);
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--theme-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--theme-text-small-size);
  font-weight: var(--theme-text-small-weight);
}
</style>
