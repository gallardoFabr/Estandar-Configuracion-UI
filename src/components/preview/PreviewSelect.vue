<template>
  <div class="preview-select-wrapper">
    <label v-if="label" class="preview-label">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>
    <select 
      class="preview-select"
      :class="{ 'is-disabled': disabled }"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :disabled="disabled"
    >
      <option value="" disabled selected>Seleccione...</option>
      <option v-for="(opt, idx) in options" :key="idx" :value="opt.value || opt">
        {{ opt.label || opt }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  options: { type: Array, default: () => [] },
  required: Boolean,
  disabled: Boolean
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.preview-select-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}
.preview-label {
  font-size: var(--theme-text-secondary-size);
  color: var(--theme-text-secondary);
  font-weight: var(--theme-text-secondary-weight);
}
.required {
  color: var(--theme-error);
}
.preview-select {
  padding: 0.5rem;
  border: 1px solid var(--theme-table-border-color);
  border-radius: var(--theme-radius-base);
  font-size: var(--theme-text-normal-size);
  font-family: var(--theme-font-family);
  font-weight: var(--theme-text-normal-weight);
  outline: none;
  background-color: #fff;
}
.preview-select:focus {
  border-color: var(--theme-primary);
}
.preview-select.is-disabled {
  background-color: #f1f5f9;
  color: var(--theme-text-secondary);
  cursor: not-allowed;
}
</style>
