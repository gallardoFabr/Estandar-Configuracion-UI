<template>
  <main class="preview-content">
    <PreviewBreadcrumb />
    <h1 class="page-title">{{ title }}</h1>
    <p class="page-subtitle">Gestión y consulta de información del sistema educativo.</p>
    <div class="info-notice">
      <span>Información:</span> La previsualización utiliza datos ficticios para mostrar el estándar GUI.
    </div>
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
  box-sizing: border-box;
  font-family: var(--theme-font-family);
  display: flex;
  flex-direction: column;
}
.page-title {
  max-width: var(--theme-content-max-width);
  width: 100%;
  align-self: center;
  box-sizing: border-box;
  font-size: var(--theme-title-main-size);
  font-weight: var(--theme-title-main-weight);
  font-family: var(--theme-font-family);
  margin: 1rem 0;
  color: var(--theme-text-primary);
}
.screen-container {
  flex: 1;
  width: 100%;
  width: min(100%, var(--theme-content-max-width));
  align-self: center;
  box-sizing: border-box;
  border-radius: var(--theme-radius-global);
}
.page-subtitle {
  width: min(100%, var(--theme-content-max-width));
  align-self: center;
  margin: -6px 0 12px;
  color: var(--theme-text-secondary);
  font-size: var(--theme-subtitle-size);
  font-weight: var(--theme-subtitle-weight);
  font-family: var(--theme-font-family);
}
.info-notice {
  width: min(100%, var(--theme-content-max-width));
  align-self: center;
  box-sizing: border-box;
  padding: 10px 12px;
  margin-bottom: 12px;
  border: 1px solid color-mix(in srgb, var(--theme-info) 35%, transparent);
  border-left: 4px solid var(--theme-info);
  border-radius: var(--theme-radius-global);
  background: color-mix(in srgb, var(--theme-info) 8%, transparent);
  color: var(--theme-text-secondary);
  font-size: var(--theme-text-secondary-size);
  font-weight: var(--theme-text-secondary-weight);
}
.info-notice span { color: var(--theme-info); font-weight: 700; }
.empty-state {
  color: var(--theme-text-secondary);
  text-align: center;
  padding: 3rem;
}
</style>
