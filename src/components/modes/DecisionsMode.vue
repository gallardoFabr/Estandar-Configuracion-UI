<template>
  <div class="decisions-mode">
    <div class="decisions-container">
      <div class="decisions-header">
        <h2>Decisiones del Product Owner</h2>
        <p>Resumen del estado de definición del estándar GUI.</p>
      </div>
      
      <div class="progress-section">
        <ProgressBar :percentage="decisionStore.progressPercentage" label="Progreso de definición GUI" />
        <div class="stats-row">
          <span class="stat approved">● Aprobados: {{ decisionStore.progressCounts.approved }}</span>
          <span class="stat changes">○ Requiere cambios: {{ decisionStore.progressCounts.changes }}</span>
          <span class="stat pending">○ Pendientes: {{ decisionStore.progressCounts.pending }}</span>
        </div>
      </div>

      <div class="categories-grid">
        <div 
          v-for="category in appStore.categories" 
          :key="category.id"
          class="category-card"
          :class="'status-' + decisionStore.getCategoryStatus(category.id)"
        >
          <div class="card-header">
            <component :is="getIcon(category.icon)" class="cat-icon" />
            <h3>{{ category.label }}</h3>
            <span class="status-badge">
              {{ getStatusLabel(decisionStore.getCategoryStatus(category.id)) }}
            </span>
          </div>
          
          <div class="card-body">
            <div v-if="decisionStore.getCategoryComment(category.id)" class="comment-block">
              <strong>Comentario:</strong>
              <p>{{ decisionStore.getCategoryComment(category.id) }}</p>
            </div>
            <div v-else class="no-comment">
              Sin comentarios adicionales.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDecisionStore } from '@/stores/decisionStore.js'
import { useAppStore } from '@/stores/appStore.js'
import ProgressBar from '@/components/common/ProgressBar.vue'
import * as icons from '@lucide/vue'

const decisionStore = useDecisionStore()
const appStore = useAppStore()

function getIcon(iconName) {
  return icons[iconName] || icons.HelpCircle
}

function getStatusLabel(status) {
  const map = {
    'approved': '✓ Aprobado',
    'changes': '⚠ Requiere cambios',
    'pending': '○ Pendiente'
  }
  return map[status] || map.pending
}
</script>

<style scoped>
.decisions-mode {
  flex: 1;
  overflow-y: auto;
  padding: 40px;
  background-color: var(--tool-bg);
}

.decisions-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.decisions-header h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--tool-text);
}

.decisions-header p {
  color: var(--tool-text-secondary);
  font-size: 16px;
}

.progress-section {
  background: white;
  padding: 24px;
  border-radius: var(--tool-radius-lg);
  box-shadow: var(--tool-shadow);
}

.stats-row {
  display: flex;
  gap: 24px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
}

.stat.approved { color: var(--tool-success); }
.stat.changes { color: var(--tool-warning); }
.stat.pending { color: var(--tool-text-muted); }

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.category-card {
  background: white;
  border-radius: var(--tool-radius);
  box-shadow: var(--tool-shadow-sm);
  border: 1px solid var(--tool-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.category-card.status-approved { border-top: 4px solid var(--tool-success); }
.category-card.status-changes { border-top: 4px solid var(--tool-warning); }
.category-card.status-pending { border-top: 4px solid var(--tool-text-muted); }

.card-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--tool-border);
  background: var(--tool-bg);
}

.cat-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  color: var(--tool-text-secondary);
}

.card-header h3 {
  font-size: 16px;
  font-weight: 600;
  flex: 1;
}

.status-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
}

.status-approved .status-badge { background: #dcfce7; color: #166534; }
.status-changes .status-badge { background: #fef9c3; color: #854d0e; }
.status-pending .status-badge { background: #f1f5f9; color: #475569; }

.card-body {
  padding: 16px;
  flex: 1;
}

.comment-block strong {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  color: var(--tool-text-muted);
  margin-bottom: 4px;
}

.comment-block p {
  font-size: 14px;
  color: var(--tool-text);
  background: #f8fafc;
  padding: 12px;
  border-radius: var(--tool-radius-sm);
  border-left: 3px solid var(--tool-accent);
}

.no-comment {
  font-size: 14px;
  color: var(--tool-text-muted);
  font-style: italic;
  text-align: center;
  padding: 20px 0;
}
</style>
