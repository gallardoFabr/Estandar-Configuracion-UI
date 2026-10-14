<template>
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
  font-size: var(--theme-subtitle-size);
  font-weight: var(--theme-subtitle-weight);
  color: var(--theme-text-primary);
}
</style>
