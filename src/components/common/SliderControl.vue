<template>
  <div class="slider-control">
    <div class="header">
      <label v-if="label">{{ label }}</label>
      <div class="value-container">
        <input 
          type="number" 
          :value="modelValue" 
          @input="handleInput"
          class="value-input"
          :min="min"
          :max="max"
          :step="step"
        />
        <span class="unit" v-if="unit">{{ unit }}</span>
      </div>
    </div>
    <div class="slider-wrapper">
      <input 
        type="range"
        :value="modelValue"
        @input="handleInput"
        :min="min"
        :max="max"
        :step="step"
        class="slider"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  unit: {
    type: String,
    default: 'px'
  }
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (e) => {
  let val = Number(e.target.value)
  if (isNaN(val)) return
  if (val < props.min) val = props.min
  if (val > props.max) val = props.max
  emit('update:modelValue', val)
}
</script>

<style scoped>
.slider-control {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-size: 12px;
  font-weight: 500;
  color: var(--tool-text, #333);
}

.value-container {
  display: flex;
  align-items: center;
  gap: 4px;
}

.value-input {
  width: 48px;
  height: 24px;
  padding: 0 4px;
  text-align: right;
  border: 1px solid var(--tool-border, #ddd);
  border-radius: 4px;
  font-size: 12px;
  color: var(--tool-text, #333);
  -moz-appearance: textfield;
}

.value-input::-webkit-outer-spin-button,
.value-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.value-input:focus {
  outline: none;
  border-color: var(--tool-accent, #2563eb);
}

.unit {
  font-size: 12px;
  color: var(--tool-text-muted, #666);
}

.slider-wrapper {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: var(--tool-border, #ddd);
  outline: none;
  margin: 8px 0;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--tool-bg, #fff);
  border: 2px solid var(--tool-accent, #2563eb);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--tool-bg, #fff);
  border: 2px solid var(--tool-accent, #2563eb);
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
</style>
