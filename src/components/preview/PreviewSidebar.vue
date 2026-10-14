<template>
  <aside class="preview-sidebar">
    <nav class="sidebar-nav">
      <button 
        v-for="item in menuItems" 
        :key="item.id"
        class="nav-item"
        :class="{ active: appStore.activeScreen === item.id }"
        @click="appStore.setScreen(item.id)"
      >
        <component :is="getIcon(item.icon)" class="nav-icon" />
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { menusByRole } from '@/data/menusByRole';
import { 
  Users, ClipboardList, CreditCard, ClipboardCheck, 
  BarChart3, Calendar, UserCog, Settings, BookOpen, FileText 
} from '@lucide/vue';

const appStore = useAppStore();

const menuItems = computed(() => {
  return menusByRole[appStore.activeRole] || [];
});

const icons = {
  Users, ClipboardList, CreditCard, ClipboardCheck, 
  BarChart3, Calendar, UserCog, Settings, BookOpen, FileText
};

const getIcon = (iconName) => {
  return icons[iconName] || FileText;
};
</script>

<style scoped>
.preview-sidebar {
  width: var(--theme-sidebar-width);
  background-color: var(--theme-sidebar-bg);
  color: #fff;
  height: calc(100% - 16px);
  margin: 8px 0 8px 8px;
  display: flex;
  border-radius: var(--theme-sidebar-radius);
  overflow: hidden;
  flex-direction: column;
  padding: var(--theme-sidebar-spacing) 0;
  flex-shrink: 0;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem var(--theme-sidebar-spacing);
  font-family: var(--theme-font-family);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  text-align: left;
  font-size: var(--theme-text-normal-size);
  font-weight: var(--theme-text-normal-weight);
  transition: all 0.2s;
}
.nav-item:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}
.nav-item.active {
  color: #fff;
  background-color: var(--theme-primary);
  border-left: 4px solid var(--theme-secondary);
}
.nav-icon {
  width: var(--theme-icon-size);
  height: var(--theme-icon-size);
  stroke-width: var(--theme-icon-stroke-width);
  color: var(--theme-sidebar-icon-color);
}
</style>
