<template>
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
</style>
