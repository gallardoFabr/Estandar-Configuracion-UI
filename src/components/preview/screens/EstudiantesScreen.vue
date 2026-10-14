<template>
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
</style>
