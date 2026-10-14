<template>
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
</style>
