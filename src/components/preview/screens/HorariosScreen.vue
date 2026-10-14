<template>
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
  color: var(--theme-text-primary);
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
  font-size: var(--theme-text-normal-size);
  font-weight: var(--theme-text-normal-weight);
}
.preview-table th {
  background-color: var(--theme-table-header-bg);
  font-weight: var(--theme-text-secondary-weight);
  color: var(--theme-text-primary);
}
.is-break td {
  background-color: #f1f5f9;
  font-weight: var(--theme-text-secondary-weight);
  color: #64748b;
}
</style>
