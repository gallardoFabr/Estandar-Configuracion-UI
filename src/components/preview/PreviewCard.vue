<template>
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
  border-top: 3px solid var(--theme-secondary);
}
.card-title {
  margin: 0;
  font-size: var(--theme-title-section-size);
  font-weight: var(--theme-title-section-weight);
  color: var(--theme-text-primary);
}
.card-body {
  padding: 1rem;
  font-family: var(--theme-font-family);
  font-size: var(--theme-text-normal-size);
  font-weight: var(--theme-text-normal-weight);
  color: var(--theme-text-primary);
}
</style>
