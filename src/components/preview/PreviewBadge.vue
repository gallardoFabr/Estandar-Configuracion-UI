<template>
  <span class="preview-badge" :class="[`type-${type}`]">
    {{ status }}
  </span>
</template>

<script setup>
defineProps({
  status: { type: String, required: true },
  type: { type: String, default: 'neutral' }
});
</script>

<style scoped>
.preview-badge {
  display: inline-flex;
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: var(--theme-text-small-size);
  font-weight: var(--theme-text-small-weight);
  text-transform: uppercase;
}

.type-success {
  background-color: color-mix(in srgb, var(--theme-success) 15%, transparent);
  color: var(--theme-success);
}
.type-warning {
  background-color: color-mix(in srgb, var(--theme-warning) 15%, transparent);
  color: var(--theme-warning);
}
.type-error {
  background-color: color-mix(in srgb, var(--theme-error) 15%, transparent);
  color: var(--theme-error);
}
.type-info {
  background-color: color-mix(in srgb, var(--theme-info) 15%, transparent);
  color: var(--theme-info);
}
.type-neutral {
  background-color: #f1f5f9;
  color: #64748b;
}
</style>
