<template>
  <div class="decision-marker">
    <label class="title">Estado de decisión</label>
    <div class="options-container">
      <label 
        v-for="opt in options" 
        :key="opt.value" 
        class="radio-label"
        :class="{ active: modelValue === opt.value }"
      >
        <input 
          type="radio" 
          :value="opt.value"
          :checked="modelValue === opt.value"
          @change="emit('update:modelValue', opt.value)"
          class="hidden-radio"
        />
        <span class="indicator" :class="opt.value"></span>
        <span class="text">{{ opt.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const options = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'approved', label: 'Aprobado' },
  { value: 'changes', label: 'Requiere cambios' }
]
</script>

<style scoped>
.decision-marker {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 7px 10px;
  background: var(--tool-bg-light, #fafafa);
  border: 1px solid var(--tool-border, #ddd);
  border-radius: 6px;
}

.title {
  font-size: 12px;
  font-weight: 600;
  color: var(--tool-text, #333);
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 12px;
  color: var(--tool-text, #333);
  padding: 2px 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.radio-label:hover {
  background: var(--tool-bg-hover, #f0f0f0);
}

.radio-label.active {
  background: var(--tool-bg-active, #eef2ff);
  font-weight: 500;
}

.hidden-radio {
  display: none;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid rgba(0,0,0,0.1);
}

.indicator.pending {
  background-color: var(--tool-color-pending, #9ca3af);
}

.indicator.approved {
  background-color: var(--tool-color-approved, #10b981);
}

.indicator.changes {
  background-color: var(--tool-color-changes, #f59e0b);
}

.active .indicator {
  box-shadow: 0 0 0 2px var(--tool-bg, #fff), 0 0 0 4px var(--theme-primary, #3b82f6);
}
</style>
