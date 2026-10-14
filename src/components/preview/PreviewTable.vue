<template>
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
            <a href="#" class="action-link"><Eye class="action-icon" />Ver</a>
            <a href="#" class="action-link"><Pencil class="action-icon" />Editar</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import PreviewBadge from './PreviewBadge.vue';
import { Eye, Pencil } from '@lucide/vue';

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
  'Retirado': 'neutral',
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
  border-radius: var(--theme-table-radius);
  background: #fff;
}
.preview-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.preview-table th, .preview-table td {
  height: var(--theme-table-row-height);
  box-sizing: border-box;
  padding: 0 1rem;
  border-bottom: 1px solid var(--theme-table-border-color);
  font-size: var(--theme-text-normal-size);
  font-family: var(--theme-font-family);
  font-weight: var(--theme-text-normal-weight);
}
.preview-table tbody { background-color: var(--theme-table-row-bg); }
.preview-table th {
  background-color: var(--theme-table-header-bg);
  font-weight: var(--theme-text-secondary-weight);
  color: var(--theme-table-header-color);
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
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--theme-primary);
  text-decoration: none;
  font-weight: var(--theme-text-secondary-weight);
}
.action-icon {
  width: var(--theme-icon-size);
  height: var(--theme-icon-size);
  stroke-width: var(--theme-icon-stroke-width);
}
.action-link:hover {
  text-decoration: underline;
}
</style>
