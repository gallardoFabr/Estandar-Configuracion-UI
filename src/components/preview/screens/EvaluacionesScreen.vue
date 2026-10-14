<template>
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
</style>
