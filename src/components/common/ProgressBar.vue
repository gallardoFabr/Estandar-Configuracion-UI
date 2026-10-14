<template>
  <div class="progress-container">
    <div class="progress-header">
      <span class="progress-label">{{ label }}</span>
      <span class="progress-percentage">{{ Math.round(percentage) }}%</span>
    </div>
    <div class="progress-track">
      <div 
        class="progress-fill" 
        :style="{ width: `${percentage}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  percentage: {
    type: Number,
    required: true,
    default: 0
  },
  label: {
    type: String,
    default: 'Progreso de definición GUI'
  }
})
</script>

<style scoped>
.progress-container {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--tool-text, #333);
}

.progress-percentage {
  font-size: 12px;
  font-weight: 600;
  color: var(--tool-color-approved, #10b981);
}

.progress-track {
  width: 100%;
  height: 8px;
  background: var(--tool-border, #e5e7eb);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--tool-color-approved, #10b981);
  border-radius: 4px;
  transition: width 0.3s ease;
}
</style>
