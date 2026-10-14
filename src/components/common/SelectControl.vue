<template>
  <div class="select-control">
    <label v-if="label">{{ label }}</label>
    <div class="select-wrapper">
      <select :value="modelValue" @change="emit('update:modelValue', $event.target.value)">
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <ChevronDown class="chevron" :size="16" />
    </div>
  </div>
</template>

<script setup>
import { ChevronDown } from '@lucide/vue'

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
.select-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  font-weight: 500;
  color: var(--tool-text, #333);
}

.select-wrapper {
  position: relative;
  width: 100%;
}

select {
  width: 100%;
  height: 32px;
  padding: 0 32px 0 12px;
  border: 1px solid var(--tool-border, #ddd);
  border-radius: 4px;
  background: var(--tool-bg, #fff);
  font-size: 13px;
  color: var(--tool-text, #333);
  appearance: none;
  cursor: pointer;
}

select:focus {
  outline: none;
  border-color: var(--theme-primary, #3b82f6);
}

.chevron {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--tool-text-muted, #666);
  pointer-events: none;
}
</style>
