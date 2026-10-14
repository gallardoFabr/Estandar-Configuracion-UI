<template>
  <div class="editor-panel">
    <div class="section">
      <h3 class="section-title">Fuente</h3>
      <SelectControl 
        v-model="fontFamily" 
        label="Familia tipográfica" 
        :options="fontOptions" 
      />
    </div>

    <div class="divider"></div>

    <div class="section" v-for="level in typographyLevels" :key="level.key">
      <h3 class="section-title">{{ level.label }}</h3>
      
      <div class="controls-grid">
        <SliderControl 
          v-model="level.sizeModel.value" 
          label="Tamaño" 
          :min="10" 
          :max="48" 
          unit="px" 
        />
        <SelectControl 
          v-model="level.weightModel.value" 
          label="Peso" 
          :options="weightOptions" 
        />
      </div>


    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/themeStore.js'
import SelectControl from '@/components/common/SelectControl.vue'
import SliderControl from '@/components/common/SliderControl.vue'

const themeStore = useThemeStore()

const fontOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Open Sans', label: 'Open Sans' },
  { value: 'Poppins', label: 'Poppins' }
]

const weightOptions = [
  { value: 300, label: '300 Light' },
  { value: 400, label: '400 Regular' },
  { value: 500, label: '500 Medium' },
  { value: 600, label: '600 Semibold' },
  { value: 700, label: '700 Bold' }
]

const fontFamily = computed({
  get: () => themeStore.theme.typography.fontFamily,
  set: (val) => themeStore.updateFontFamily(val)
})

const createLevelModel = (level, prop) => {
  return computed({
    get: () => themeStore.theme.typography[level][prop],
    set: (val) => themeStore.updateTypographyLevel(level, prop, val)
  })
}

const typographyLevels = [
  { 
    key: 'titleMain', 
    label: 'Título principal',
    sizeModel: createLevelModel('titleMain', 'size'),
    weightModel: createLevelModel('titleMain', 'weight')
  },
  { 
    key: 'titleSection', 
    label: 'Título de sección',
    sizeModel: createLevelModel('titleSection', 'size'),
    weightModel: createLevelModel('titleSection', 'weight')
  },
  { 
    key: 'subtitle', 
    label: 'Subtítulo',
    sizeModel: createLevelModel('subtitle', 'size'),
    weightModel: createLevelModel('subtitle', 'weight')
  },
  { 
    key: 'textNormal', 
    label: 'Texto normal',
    sizeModel: createLevelModel('textNormal', 'size'),
    weightModel: createLevelModel('textNormal', 'weight')
  },
  { 
    key: 'textSecondary', 
    label: 'Texto secundario',
    sizeModel: createLevelModel('textSecondary', 'size'),
    weightModel: createLevelModel('textSecondary', 'weight')
  },
  { 
    key: 'textSmall', 
    label: 'Texto pequeño',
    sizeModel: createLevelModel('textSmall', 'size'),
    weightModel: createLevelModel('textSmall', 'weight')
  }
]
</script>

<style scoped>
.editor-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
  width: 100%;
}

.controls-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.preview-box {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #111;
}
</style>
