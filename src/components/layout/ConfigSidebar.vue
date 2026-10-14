<template>
  <aside class="config-sidebar">
    <div class="sidebar-list">
      <button
        v-for="category in appStore.categories"
        :key="category.id"
        class="category-item"
        :class="{ active: appStore.activeCategory === category.id }"
        @click="appStore.setCategory(category.id)"
      >
        <component :is="iconMap[category.icon]" class="category-icon" />
        <span class="category-label">{{ category.label }}</span>
        <div class="status-dot" :class="getStatusClass(category.id)"></div>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useDecisionStore } from '@/stores/decisionStore'
import {
  Palette,
  Type,
  MousePointerClick,
  FileText,
  Table,
  AlertCircle,
  Maximize2,
  Search,
  Layout,
  AlertTriangle
} from '@lucide/vue'

const appStore = useAppStore()
const decisionStore = useDecisionStore()

const iconMap = {
  Palette,
  Type,
  MousePointerClick,
  FileText,
  Table,
  AlertCircle,
  Maximize2,
  Search,
  Layout,
  AlertTriangle
}

const getStatusClass = (categoryId) => {
  const status = decisionStore.categorySummary[categoryId]
  if (status === 'approved') return 'status-green'
  if (status === 'changes_required') return 'status-amber'
  return 'status-gray'
}
</script>

<style scoped>
.config-sidebar {
  width: 220px;
  background-color: #ffffff;
  border-right: 1px solid #e2e8f0;
  padding: 16px 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
  color: #475569;
}

.category-item:hover {
  background-color: #f8fafc;
}

.category-item.active {
  background-color: #eff6ff;
  color: var(--tool-accent, #2563eb);
}

.category-icon {
  width: 18px;
  height: 18px;
  margin-right: 12px;
  flex-shrink: 0;
}

.category-label {
  flex-grow: 1;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-green {
  background-color: #10b981;
}

.status-amber {
  background-color: #f59e0b;
}

.status-gray {
  background-color: #cbd5e1;
}
</style>
