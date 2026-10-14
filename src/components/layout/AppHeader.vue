<template>
  <header class="app-header">
    <div class="left-section">
      <h1 class="app-title">GUI Builder</h1>
      <span class="app-subtitle">Sistema de Gestión Educativa</span>
    </div>

    <div class="center-section">
      <div class="mode-tabs">
        <button
          v-for="mode in modes"
          :key="mode.id"
          class="mode-tab"
          :class="{ active: appStore.activeMode === mode.id }"
          @click="appStore.setMode(mode.id)"
        >
          {{ mode.label }}
        </button>
      </div>
    </div>

    <div class="right-section">
      <button class="action-btn" @click="handleExport">
        <Download class="icon" />
        <span class="btn-label">Exportar JSON</span>
      </button>
      
      <button class="action-btn primary" @click="handleSave">
        <Save class="icon" />
        <span class="btn-label">Guardar</span>
      </button>
      
      <button class="action-btn subtle" @click="showResetConfirm = true">
        <RotateCcw class="icon" />
        <span class="btn-label">Restablecer</span>
      </button>
    </div>

    <div v-if="toastVisible" class="toast">
      ✓ Configuración guardada correctamente
    </div>

    <div v-if="showResetConfirm" class="modal-overlay">
      <div class="confirm-modal">
        <p>¿Desea restablecer toda la configuración? Se perderán los cambios actuales.</p>
        <div class="modal-actions">
          <button class="modal-btn cancel" @click="showResetConfirm = false">Cancelar</button>
          <button class="modal-btn confirm" @click="handleReset">Restablecer</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Download, Save, RotateCcw } from '@lucide/vue'
import { useAppStore } from '@/stores/appStore'
import { useThemeStore } from '@/stores/themeStore'
import { useDecisionStore } from '@/stores/decisionStore'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { exportConfigAsJSON } from '@/utils/exportJson.js'

const appStore = useAppStore()
const themeStore = useThemeStore()
const decisionStore = useDecisionStore()
const { saveConfig, clearConfig } = useLocalStorage()

const modes = [
  { id: 'design', label: 'Diseñar' },
  { id: 'review', label: 'Revisar' },
  { id: 'decisions', label: 'Decisiones' }
]

const toastVisible = ref(false)
const showResetConfirm = ref(false)

const handleExport = () => {
  exportConfigAsJSON(themeStore.theme, decisionStore.decisions)
}

const handleSave = () => {
  saveConfig()
  toastVisible.value = true
  setTimeout(() => {
    toastVisible.value = false
  }, 3000)
}

const handleReset = () => {
  themeStore.resetToDefaults()
  decisionStore.resetDecisions()
  clearConfig()
  showResetConfirm.value = false
}
</script>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid var(--theme-border, #e2e8f0);
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.left-section {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: var(--tool-text, #1e293b);
}

.app-subtitle {
  font-size: 0.875rem;
  color: var(--tool-text-muted, #64748b);
}

.mode-tabs {
  display: flex;
  background-color: #f1f5f9;
  padding: 4px;
  border-radius: 8px;
}

.mode-tab {
  padding: 6px 16px;
  border: none;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--tool-text-muted, #64748b);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-tab.active {
  background-color: #ffffff;
  color: var(--tool-accent, #2563eb);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.right-section {
  display: flex;
  gap: 8px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  color: #334155;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: #f8fafc;
}

.action-btn.primary {
  background-color: var(--tool-accent, #2563eb);
  color: white;
  border-color: transparent;
}

.action-btn.primary:hover {
  background-color: var(--tool-accent-hover, #1d4ed8);
}

.action-btn.subtle {
  border-color: transparent;
  color: var(--tool-text-muted, #64748b);
}

.action-btn.subtle:hover {
  background-color: #f1f5f9;
  color: #ef4444;
}

.icon {
  width: 16px;
  height: 16px;
}

.toast {
  position: fixed;
  top: 70px;
  right: 24px;
  background-color: #10b981;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: slideIn 0.3s ease-out;
  z-index: 1000;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.confirm-modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
}

.confirm-modal p {
  margin: 0 0 20px 0;
  font-size: 1rem;
  color: #334155;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  border: none;
}

.modal-btn.cancel {
  background-color: #f1f5f9;
  color: #475569;
}

.modal-btn.confirm {
  background-color: #ef4444;
  color: white;
}

@media (max-width: 768px) {
  .btn-label, .app-subtitle {
    display: none;
  }
  .app-header {
    padding: 0 12px;
  }
}
</style>
