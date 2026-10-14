<template>
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
</style>
