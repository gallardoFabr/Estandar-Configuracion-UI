const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Gino\\.gemini\\antigravity\\scratch\\gui-standard-builder\\src\\components\\preview';
const screensDir = path.join(srcDir, 'screens');

if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
if (!fs.existsSync(screensDir)) fs.mkdirSync(screensDir, { recursive: true });

const files = {};

// 1. PreviewApp.vue
files['PreviewApp.vue'] = `<template>
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
</style>`;

// 2. PreviewHeader.vue
files['PreviewHeader.vue'] = `<template>
  <header class="preview-header">
    <div class="header-left">
      <button class="menu-toggle" @click="$emit('toggle-sidebar')" v-if="appStore.activeDevice === 'mobile'">
        <MenuIcon />
      </button>
      <div class="logo">
        <GraduationCap class="logo-icon" />
        <span class="logo-text">Colegio San Martín</span>
      </div>
    </div>
    <div class="header-center">
      <div class="search-bar">
        <Search class="search-icon" />
        <input type="text" placeholder="Buscar..." />
      </div>
    </div>
    <div class="header-right">
      <button class="bell-btn">
        <Bell class="bell-icon" />
      </button>
      <div class="avatar">AM</div>
    </div>
  </header>
</template>

<script setup>
import { useAppStore } from '@/stores/appStore';
import { Menu as MenuIcon, GraduationCap, Search, Bell } from '@lucide/vue';

const appStore = useAppStore();
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
  font-weight: bold;
  color: var(--theme-primary);
}
.logo-icon {
  width: 24px;
  height: 24px;
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
}
.search-icon {
  width: 16px;
  height: 16px;
  color: var(--theme-text-secondary);
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
  color: var(--theme-text-secondary);
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
  font-size: 14px;
  font-weight: bold;
}
</style>`;

// 3. PreviewSidebar.vue
files['PreviewSidebar.vue'] = `<template>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--theme-sidebar-spacing) 0;
  flex-shrink: 0;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem var(--theme-sidebar-spacing);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  text-align: left;
  font-size: var(--theme-text-base-size);
  transition: all 0.2s;
}
.nav-item:hover {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
}
.nav-item.active {
  color: #fff;
  background-color: var(--theme-primary);
  border-left: 4px solid #fff;
}
.nav-icon {
  width: 20px;
  height: 20px;
}
</style>`;

// 4. PreviewContent.vue
files['PreviewContent.vue'] = `<template>
  <main class="preview-content">
    <PreviewBreadcrumb />
    <h1 class="page-title">{{ title }}</h1>
    
    <div class="screen-container">
      <EstudiantesScreen v-if="appStore.activeScreen === 'estudiantes'" />
      <MatriculaScreen v-else-if="appStore.activeScreen === 'matricula'" />
      <PagosScreen v-else-if="appStore.activeScreen === 'pagos'" />
      <AsistenciaScreen v-else-if="appStore.activeScreen === 'asistencia'" />
      <EvaluacionesScreen v-else-if="appStore.activeScreen === 'evaluaciones'" />
      <HorariosScreen v-else-if="appStore.activeScreen === 'horarios'" />
      <UsuariosScreen v-else-if="appStore.activeScreen === 'usuarios'" />
      <ConfiguracionScreen v-else-if="appStore.activeScreen === 'configuracion'" />
      <div v-else class="empty-state">Pantalla no encontrada o no implementada</div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { screenTitles } from '@/data/menusByRole';
import PreviewBreadcrumb from './PreviewBreadcrumb.vue';

// Screens
import EstudiantesScreen from './screens/EstudiantesScreen.vue';
import MatriculaScreen from './screens/MatriculaScreen.vue';
import PagosScreen from './screens/PagosScreen.vue';
import AsistenciaScreen from './screens/AsistenciaScreen.vue';
import EvaluacionesScreen from './screens/EvaluacionesScreen.vue';
import HorariosScreen from './screens/HorariosScreen.vue';
import UsuariosScreen from './screens/UsuariosScreen.vue';
import ConfiguracionScreen from './screens/ConfiguracionScreen.vue';

const appStore = useAppStore();

const title = computed(() => {
  return screenTitles[appStore.activeScreen] || 'Dashboard';
});
</script>

<style scoped>
.preview-content {
  flex: 1;
  background-color: var(--theme-content-bg);
  padding: var(--theme-content-padding);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.page-title {
  font-size: var(--theme-title-size);
  margin: 1rem 0;
  color: var(--theme-text-primary);
}
.screen-container {
  flex: 1;
}
.empty-state {
  color: var(--theme-text-secondary);
  text-align: center;
  padding: 3rem;
}
</style>`;

// 5. PreviewBreadcrumb.vue
files['PreviewBreadcrumb.vue'] = `<template>
  <nav class="preview-breadcrumb">
    <span>Inicio</span>
    <ChevronRight class="breadcrumb-icon" />
    <span class="current">{{ title }}</span>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStore } from '@/stores/appStore';
import { screenTitles } from '@/data/menusByRole';
import { ChevronRight } from '@lucide/vue';

const appStore = useAppStore();
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
  width: 14px;
  height: 14px;
}
.current {
  color: var(--theme-text-primary);
  font-weight: 500;
}
</style>`;

// 6. PreviewButton.vue
files['PreviewButton.vue'] = `<template>
  <button 
    class="preview-button" 
    :class="[\`variant-\${variant}\`, { 'is-loading': loading }]"
    :disabled="variant === 'disabled' || loading"
  >
    <span v-if="loading" class="spinner"></span>
    <component v-else-if="iconComponent" :is="iconComponent" class="btn-icon" />
    <span>{{ loading ? 'Guardando...' : label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import * as LucideIcons from '@lucide/vue';

const props = defineProps({
  variant: { type: String, default: 'primary' },
  label: { type: String, required: true },
  loading: { type: Boolean, default: false },
  icon: { type: String, default: '' }
});

const iconComponent = computed(() => {
  return props.icon ? LucideIcons[props.icon] : null;
});
</script>

<style scoped>
.preview-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--theme-radius-base);
  font-size: var(--theme-text-base-size);
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.preview-button:disabled {
  pointer-events: none;
  opacity: 0.6;
}

.variant-primary {
  background-color: var(--theme-btn-primary-bg, var(--theme-primary));
  color: #fff;
}
.variant-secondary {
  background-color: var(--theme-btn-secondary-bg, #e2e8f0);
  color: var(--theme-text-primary);
  border-color: #cbd5e1;
}
.variant-cancel {
  background-color: transparent;
  color: var(--theme-text-secondary);
  border-color: #cbd5e1;
}
.variant-delete {
  background-color: var(--theme-error);
  color: #fff;
}
.variant-disabled {
  background-color: #f1f5f9;
  color: #94a3b8;
}

.btn-icon {
  width: 16px;
  height: 16px;
}
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>`;

// 7. PreviewInput.vue
files['PreviewInput.vue'] = `<template>
  <div class="preview-input-wrapper">
    <label v-if="label" class="preview-label">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>
    <input 
      :type="type"
      class="preview-input"
      :class="{ 'has-error': error, 'is-disabled': disabled }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <span v-if="error" class="error-msg">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  placeholder: String,
  required: Boolean,
  error: String,
  disabled: Boolean,
  type: { type: String, default: 'text' }
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.preview-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}
.preview-label {
  font-size: var(--theme-text-small-size);
  color: var(--theme-text-primary);
  font-weight: 500;
}
.required {
  color: var(--theme-error);
}
.preview-input {
  padding: 0.5rem;
  border: 1px solid var(--theme-table-border-color);
  border-radius: var(--theme-radius-base);
  font-size: var(--theme-text-base-size);
  outline: none;
  transition: border-color 0.2s;
  background-color: #fff;
}
.preview-input:focus {
  border-color: var(--theme-primary);
}
.preview-input.has-error {
  border-color: var(--theme-error);
}
.preview-input.is-disabled {
  background-color: #f1f5f9;
  color: var(--theme-text-secondary);
  cursor: not-allowed;
}
.error-msg {
  font-size: var(--theme-text-small-size);
  color: var(--theme-error);
}
</style>`;

// 8. PreviewSelect.vue
files['PreviewSelect.vue'] = `<template>
  <div class="preview-select-wrapper">
    <label v-if="label" class="preview-label">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>
    <select 
      class="preview-select"
      :class="{ 'is-disabled': disabled }"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
    >
      <option value="" disabled selected>Seleccione...</option>
      <option v-for="(opt, idx) in options" :key="idx" :value="opt.value || opt">
        {{ opt.label || opt }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  options: { type: Array, default: () => [] },
  required: Boolean,
  disabled: Boolean
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.preview-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}
.preview-label {
  font-size: var(--theme-text-small-size);
  color: var(--theme-text-primary);
  font-weight: 500;
}
.required {
  color: var(--theme-error);
}
.preview-select {
  padding: 0.5rem;
  border: 1px solid var(--theme-table-border-color);
  border-radius: var(--theme-radius-base);
  font-size: var(--theme-text-base-size);
  outline: none;
  background-color: #fff;
}
.preview-select:focus {
  border-color: var(--theme-primary);
}
.preview-select.is-disabled {
  background-color: #f1f5f9;
  color: var(--theme-text-secondary);
  cursor: not-allowed;
}
</style>`;

// 9. PreviewTable.vue
files['PreviewTable.vue'] = `<template>
  <div class="table-container">
    <table class="preview-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          <th v-if="showActions">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in rows" :key="idx">
          <td v-for="col in columns" :key="col.key">
            <PreviewBadge v-if="isBadgeValue(row[col.key])" :status="row[col.key]" :type="getBadgeType(row[col.key])" />
            <span v-else>{{ row[col.key] }}</span>
          </td>
          <td v-if="showActions" class="actions-cell">
            <a href="#" class="action-link">Ver</a>
            <a href="#" class="action-link">Editar</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import PreviewBadge from './PreviewBadge.vue';

defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  showActions: { type: Boolean, default: true }
});

const badgeTypes = {
  'Activo': 'success',
  'Inactivo': 'neutral',
  'Pendiente': 'warning',
  'Moroso': 'error',
  'Pagado': 'success',
  'Aprobado': 'success',
  'Asistió': 'success',
  'Faltó': 'error',
  'Tardanza': 'warning'
};

const isBadgeValue = (val) => Object.keys(badgeTypes).includes(val);
const getBadgeType = (val) => badgeTypes[val] || 'neutral';
</script>

<style scoped>
.table-container {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--theme-table-border-color);
  border-radius: var(--theme-radius-base);
  background: #fff;
}
.preview-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.preview-table th, .preview-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--theme-table-border-color);
  font-size: var(--theme-text-small-size);
}
.preview-table th {
  background-color: var(--theme-table-header-bg);
  font-weight: 600;
  color: var(--theme-text-primary);
}
.preview-table tr:nth-child(even) {
  background-color: var(--theme-table-row-alt-bg, #f8fafc);
}
.preview-table tr:hover {
  background-color: var(--theme-table-row-hover-bg, #f1f5f9);
}
.actions-cell {
  display: flex;
  gap: 0.5rem;
}
.action-link {
  color: var(--theme-primary);
  text-decoration: none;
  font-weight: 500;
}
.action-link:hover {
  text-decoration: underline;
}
</style>`;

// 10. PreviewBadge.vue
files['PreviewBadge.vue'] = `<template>
  <span class="preview-badge" :class="\`type-\${type}\`">
    {{ status }}
  </span>
</template>

<script setup>
defineProps({
  status: { type: String, required: true },
  type: { type: String, default: 'neutral' }
});
</script>

<style scoped>
.preview-badge {
  display: inline-flex;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.type-success {
  background-color: color-mix(in srgb, var(--theme-success) 15%, transparent);
  color: var(--theme-success);
}
.type-warning {
  background-color: color-mix(in srgb, var(--theme-warning) 15%, transparent);
  color: var(--theme-warning);
}
.type-error {
  background-color: color-mix(in srgb, var(--theme-error) 15%, transparent);
  color: var(--theme-error);
}
.type-info {
  background-color: color-mix(in srgb, var(--theme-info) 15%, transparent);
  color: var(--theme-info);
}
.type-neutral {
  background-color: #f1f5f9;
  color: #64748b;
}
</style>`;

// 11. PreviewCard.vue
files['PreviewCard.vue'] = `<template>
  <div class="preview-card">
    <div v-if="title" class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String
});
</script>

<style scoped>
.preview-card {
  background: #fff;
  border-radius: var(--theme-radius-base);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid var(--theme-table-border-color);
  margin-bottom: 1rem;
  overflow: hidden;
}
.card-header {
  padding: 1rem;
  border-bottom: 1px solid var(--theme-table-border-color);
  background-color: #f8fafc;
}
.card-title {
  margin: 0;
  font-size: var(--theme-subtitle-size, 1.125rem);
  color: var(--theme-text-primary);
}
.card-body {
  padding: 1rem;
}
</style>`;

// 12. PreviewModal.vue
files['PreviewModal.vue'] = `<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button v-if="showClose" class="close-btn" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  type: { type: String, default: 'form' },
  showClose: { type: Boolean, default: true }
});
defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--theme-modal-overlay, rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-container {
  background: #fff;
  border-radius: var(--theme-modal-radius, var(--theme-radius-base));
  width: var(--theme-modal-width, 500px);
  max-width: 90vw;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}
.modal-header {
  padding: var(--theme-modal-padding, 1rem);
  border-bottom: 1px solid var(--theme-table-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h3 {
  margin: 0;
  font-size: 1.125rem;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--theme-text-secondary);
}
.modal-body {
  padding: var(--theme-modal-padding, 1rem);
}
.modal-footer {
  padding: var(--theme-modal-padding, 1rem);
  border-top: 1px solid var(--theme-table-border-color);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  background-color: #f8fafc;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-container {
  transition: transform 0.3s ease;
}
.modal-enter-from .modal-container {
  transform: scale(0.95);
}
</style>`;

// 13. PreviewToast.vue
files['PreviewToast.vue'] = `<template>
  <transition name="toast">
    <div v-if="show" class="preview-toast" :class="[\`pos-\${position}\`, \`type-\${type}\`]">
      <div class="toast-content">
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
  type: { type: String, default: 'info' },
  position: { type: String, default: 'bottom-right' }
});
</script>

<style scoped>
.preview-toast {
  position: fixed;
  padding: 1rem;
  background: #fff;
  border-radius: var(--theme-radius-base);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-left: 4px solid var(--theme-info);
  z-index: 1050;
  min-width: 250px;
}
.type-success { border-left-color: var(--theme-success); }
.type-error { border-left-color: var(--theme-error); }
.type-warning { border-left-color: var(--theme-warning); }

.pos-top-right { top: 1rem; right: 1rem; }
.pos-top-left { top: 1rem; left: 1rem; }
.pos-bottom-right { bottom: 1rem; right: 1rem; }
.pos-bottom-left { bottom: 1rem; left: 1rem; }
.pos-center { top: 1rem; left: 50%; transform: translateX(-50%); }

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>`;

// 14. EstudiantesScreen.vue
files['screens/EstudiantesScreen.vue'] = `<template>
  <div class="screen">
    <div class="actions-row">
      <div class="search-wrap">
        <PreviewInput placeholder="Buscar estudiante..." />
      </div>
      <div class="btn-group">
        <PreviewButton variant="secondary" label="Exportar" />
        <PreviewButton variant="primary" label="+ Nuevo Estudiante" />
      </div>
    </div>
    
    <PreviewTable 
      :columns="columns"
      :rows="estudiantes"
    />
  </div>
</template>

<script setup>
import PreviewButton from '../PreviewButton.vue';
import PreviewInput from '../PreviewInput.vue';
import PreviewTable from '../PreviewTable.vue';
import { estudiantes } from '@/data/mockData';

const columns = [
  { key: 'codigo', label: 'Código' },
  { key: 'nombre', label: 'Estudiante' },
  { key: 'grado', label: 'Grado' },
  { key: 'seccion', label: 'Sección' },
  { key: 'estado', label: 'Estado' }
];
</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.actions-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.search-wrap {
  width: 300px;
}
.btn-group {
  display: flex;
  gap: 0.5rem;
}
</style>`;

// 15. MatriculaScreen.vue
files['screens/MatriculaScreen.vue'] = `<template>
  <div class="screen">
    <PreviewCard title="Nueva Matrícula">
      <div class="form-grid">
        <PreviewInput label="Estudiante" placeholder="Buscar alumno..." />
        <PreviewSelect label="Grado" :options="['1° Secundaria', '2° Secundaria', '3° Secundaria']" />
        <PreviewSelect label="Sección" :options="['A', 'B', 'C']" />
      </div>
      <div class="form-actions">
        <PreviewButton variant="cancel" label="Cancelar" />
        <PreviewButton variant="primary" label="Registrar Matrícula" />
      </div>
    </PreviewCard>

    <PreviewTable 
      :columns="columns"
      :rows="matriculas"
    />
  </div>
</template>

<script setup>
import PreviewCard from '../PreviewCard.vue';
import PreviewInput from '../PreviewInput.vue';
import PreviewSelect from '../PreviewSelect.vue';
import PreviewButton from '../PreviewButton.vue';
import PreviewTable from '../PreviewTable.vue';
import { matriculas } from '@/data/mockData';

const columns = [
  { key: 'codigo', label: 'Código' },
  { key: 'estudiante', label: 'Estudiante' },
  { key: 'grado', label: 'Grado' },
  { key: 'seccion', label: 'Sección' },
  { key: 'estado', label: 'Estado' },
  { key: 'fecha', label: 'Fecha' }
];
</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>`;

// 16. PagosScreen.vue
files['screens/PagosScreen.vue'] = `<template>
  <div class="screen">
    <div class="actions-row">
      <PreviewButton variant="primary" label="Registrar Pago" />
    </div>
    
    <PreviewTable 
      :columns="columns"
      :rows="pagos"
    />
  </div>
</template>

<script setup>
import PreviewButton from '../PreviewButton.vue';
import PreviewTable from '../PreviewTable.vue';
import { pagos } from '@/data/mockData';

const columns = [
  { key: 'codigo', label: 'Código' },
  { key: 'estudiante', label: 'Estudiante' },
  { key: 'concepto', label: 'Concepto' },
  { key: 'monto', label: 'Monto' },
  { key: 'estado', label: 'Estado' },
  { key: 'fecha', label: 'Fecha' }
];
</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.actions-row {
  display: flex;
  justify-content: flex-end;
}
</style>`;

// 17. AsistenciaScreen.vue
files['screens/AsistenciaScreen.vue'] = `<template>
  <div class="screen">
    <div class="date-header">
      <h3>Semana del 04 al 08 de Marzo, 2024</h3>
    </div>
    
    <PreviewTable 
      :columns="columns"
      :rows="asistencia"
      :showActions="false"
    />
  </div>
</template>

<script setup>
import PreviewTable from '../PreviewTable.vue';
import { asistencia } from '@/data/mockData';

const columns = [
  { key: 'estudiante', label: 'Estudiante' },
  { key: 'lunes', label: 'Lunes' },
  { key: 'martes', label: 'Martes' },
  { key: 'miercoles', label: 'Miércoles' },
  { key: 'jueves', label: 'Jueves' },
  { key: 'viernes', label: 'Viernes' }
];
</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.date-header {
  padding: 1rem;
  background: #fff;
  border: 1px solid var(--theme-table-border-color);
  border-radius: var(--theme-radius-base);
}
.date-header h3 {
  margin: 0;
  font-size: var(--theme-subtitle-size, 1.125rem);
}
</style>`;

// 18. EvaluacionesScreen.vue
files['screens/EvaluacionesScreen.vue'] = `<template>
  <div class="screen">
    <div class="filter-row">
      <div class="filter-wrap">
        <PreviewSelect label="Curso" :options="['Matemática', 'Comunicación', 'Ciencias']" modelValue="Matemática" />
      </div>
    </div>
    
    <PreviewTable 
      :columns="columns"
      :rows="evaluaciones"
      :showActions="false"
    />
  </div>
</template>

<script setup>
import PreviewSelect from '../PreviewSelect.vue';
import PreviewTable from '../PreviewTable.vue';
import { evaluaciones } from '@/data/mockData';

const columns = [
  { key: 'estudiante', label: 'Estudiante' },
  { key: 'nota1', label: 'Nota 1' },
  { key: 'nota2', label: 'Nota 2' },
  { key: 'nota3', label: 'Nota 3' },
  { key: 'promedio', label: 'Promedio' }
];
</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.filter-row {
  display: flex;
}
.filter-wrap {
  width: 250px;
}
</style>`;

// 19. HorariosScreen.vue
files['screens/HorariosScreen.vue'] = `<template>
  <div class="screen">
    <h2>Horario - 3° A</h2>
    
    <div class="table-container">
      <table class="preview-table">
        <thead>
          <tr>
            <th>Hora</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in horarios" :key="idx" :class="{ 'is-break': row.lunes === 'Recreo' }">
            <td>{{ row.hora }}</td>
            <td>{{ row.lunes }}</td>
            <td>{{ row.martes }}</td>
            <td>{{ row.miercoles }}</td>
            <td>{{ row.jueves }}</td>
            <td>{{ row.viernes }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { horarios } from '@/data/mockData';
</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
h2 {
  font-size: var(--theme-subtitle-size, 1.25rem);
  margin: 0;
}
.table-container {
  width: 100%;
  overflow-x: auto;
  border: 1px solid var(--theme-table-border-color);
  border-radius: var(--theme-radius-base);
  background: #fff;
}
.preview-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.preview-table th, .preview-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--theme-table-border-color);
  font-size: var(--theme-text-small-size);
}
.preview-table th {
  background-color: var(--theme-table-header-bg);
  font-weight: 600;
  color: var(--theme-text-primary);
}
.is-break td {
  background-color: #f1f5f9;
  font-weight: 500;
  color: #64748b;
}
</style>`;

// 20. UsuariosScreen.vue
files['screens/UsuariosScreen.vue'] = `<template>
  <div class="screen">
    <div class="actions-row">
      <PreviewButton variant="primary" label="+ Nuevo Usuario" />
    </div>
    
    <PreviewTable 
      :columns="columns"
      :rows="usuarios"
    />
  </div>
</template>

<script setup>
import PreviewButton from '../PreviewButton.vue';
import PreviewTable from '../PreviewTable.vue';
import { usuarios } from '@/data/mockData';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'rol', label: 'Rol' },
  { key: 'estado', label: 'Estado' }
];
</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.actions-row {
  display: flex;
  justify-content: flex-end;
}
</style>`;

// 21. ConfiguracionScreen.vue
files['screens/ConfiguracionScreen.vue'] = `<template>
  <div class="screen">
    <PreviewCard title="Información del Colegio">
      <div class="form-grid">
        <PreviewInput label="Nombre del colegio" modelValue="Colegio San Martín" />
        <PreviewInput label="RUC" modelValue="20123456789" />
        <PreviewInput label="Dirección" modelValue="Av. Educación 123" />
        <PreviewInput label="Teléfono" modelValue="(01) 555-1234" />
      </div>
      <div class="form-actions">
        <PreviewButton variant="primary" label="Guardar" />
      </div>
    </PreviewCard>
  </div>
</template>

<script setup>
import PreviewCard from '../PreviewCard.vue';
import PreviewInput from '../PreviewInput.vue';
import PreviewButton from '../PreviewButton.vue';
</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>`;

for (const [filename, content] of Object.entries(files)) {
  const fullPath = path.join(srcDir, filename);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(\`Created \${fullPath}\`);
}
