<template>
  <div class="color-picker-control">
    <label v-if="label">{{ label }}</label>
    <div class="controls-row">
      <div 
        class="color-swatch" 
        :style="{ backgroundColor: modelValue }"
        @click="triggerColorInput"
      ></div>
      <input 
        ref="colorInput" 
        type="color" 
        :value="modelValue" 
        @input="updateColor($event.target.value)" 
        class="hidden-color-input"
      />
      <input 
        type="text" 
        :value="modelValue" 
        @input="updateColor($event.target.value)" 
        class="hex-input"
        spellcheck="false"
      />
      <button v-if="defaultValue" @click="resetColor" class="reset-btn" title="Resetear">
        <RotateCcw :size="14" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RotateCcw } from '@lucide/vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  defaultValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const colorInput = ref(null)

const triggerColorInput = () => {
  if (colorInput.value) {
    colorInput.value.click()
  }
}

const updateColor = (val) => {
  emit('update:modelValue', val)
}

const resetColor = () => {
  if (props.defaultValue) {
    emit('update:modelValue', props.defaultValue)
  }
}
</script>

<style scoped>
.color-picker-control {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  font-weight: 500;
  color: var(--tool-text, #333);
}

.controls-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid var(--tool-border, #ddd);
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
}

.hidden-color-input {
  display: none;
}

.hex-input {
  flex: 1;
  height: 28px;
  padding: 0 8px;
  border: 1px solid var(--tool-border, #ddd);
  border-radius: 4px;
  font-size: 13px;
  font-family: monospace;
  text-transform: uppercase;
  color: var(--tool-text, #333);
  background: var(--tool-bg, #fff);
}

.hex-input:focus {
  outline: none;
  border-color: var(--tool-accent, #2563eb);
}

.reset-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: 1px solid var(--tool-border, #ddd);
  border-radius: 4px;
  cursor: pointer;
  color: var(--tool-text-muted, #666);
  transition: all 0.2s;
}

.reset-btn:hover {
  background: var(--tool-bg-hover, #f5f5f5);
  color: var(--tool-text, #333);
}
</style>
