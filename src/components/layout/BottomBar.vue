<template>
  <footer class="bottom-bar">
    <div class="left-section">
      <label for="role-select" class="bar-label">Vista como:</label>
      <select 
        id="role-select" 
        v-model="activeRoleLocal" 
        class="bar-dropdown"
        @change="onRoleChange"
      >
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{ role.label }}
        </option>
      </select>
    </div>

    <div class="center-section">
      <div class="device-selector">
        <button 
          v-for="device in devices" 
          :key="device.id"
          class="device-btn"
          :class="{ active: appStore.activeDevice === device.id }"
          @click="appStore.setDevice(device.id)"
          :title="device.label"
        >
          <component :is="device.icon" class="device-icon" />
        </button>
      </div>
    </div>

    <div class="right-section">
      <span class="progress-label">Definido: {{ decisionStore.progressPercentage }}%</span>
      <div class="progress-bar-container">
        <div 
          class="progress-bar-fill"
          :style="{ width: decisionStore.progressPercentage + '%' }"
        ></div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/stores/appStore'
import { useDecisionStore } from '@/stores/decisionStore'
import { Monitor, Tablet, Smartphone } from '@lucide/vue'

const appStore = useAppStore()
const decisionStore = useDecisionStore()

const roles = [
  { id: 'administrador', label: 'Administrador' },
  { id: 'docente', label: 'Docente' },
  { id: 'alumno', label: 'Alumno' },
  { id: 'apoderado', label: 'Apoderado' }
]

const devices = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone }
]

const activeRoleLocal = ref(appStore.activeRole || 'admin')

watch(() => appStore.activeRole, (newVal) => {
  if (newVal) {
    activeRoleLocal.value = newVal
  }
})

const onRoleChange = () => {
  appStore.setRole(activeRoleLocal.value)
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  padding: 0 16px;
  background-color: #ffffff;
  border-top: 1px solid #e2e8f0;
  font-size: 0.875rem;
}

.left-section, .center-section, .right-section {
  display: flex;
  align-items: center;
  flex: 1;
}

.center-section {
  justify-content: center;
}

.right-section {
  justify-content: flex-end;
  gap: 12px;
}

.bar-label {
  font-weight: 500;
  color: #64748b;
  margin-right: 8px;
}

.bar-dropdown {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  color: #334155;
  outline: none;
}

.device-selector {
  display: flex;
  background-color: #f1f5f9;
  border-radius: 6px;
  padding: 2px;
}

.device-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;
}

.device-btn:hover {
  color: #334155;
  background-color: #e2e8f0;
}

.device-btn.active {
  background-color: #ffffff;
  color: var(--theme-primary, #2563eb);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.device-icon {
  width: 16px;
  height: 16px;
}

.progress-label {
  font-weight: 500;
  color: #475569;
}

.progress-bar-container {
  width: 100px;
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: #10b981;
  border-radius: 3px;
  transition: width 0.3s ease;
}
</style>
