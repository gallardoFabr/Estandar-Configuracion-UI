<template>
  <div class="comment-box">
    <label>Comentario del Product Owner</label>
    <textarea 
      :value="modelValue" 
      @input="handleInput"
      placeholder="Agregar comentario..."
      ref="textareaRef"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const textareaRef = ref(null)

const handleInput = (e) => {
  emit('update:modelValue', e.target.value)
  adjustHeight()
}

const adjustHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = `${Math.min(textareaRef.value.scrollHeight, 120)}px`
  }
}

watch(() => props.modelValue, () => {
  nextTick(() => {
    adjustHeight()
  })
}, { immediate: true })
</script>

<style scoped>
.comment-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 12px;
  font-weight: 600;
  color: var(--tool-text, #333);
}

textarea {
  width: 100%;
  min-height: 56px;
  max-height: 120px;
  padding: 8px 12px;
  border: 1px solid var(--tool-border, #ddd);
  border-radius: 4px;
  background: var(--tool-bg, #fff);
  font-size: 13px;
  font-family: inherit;
  color: var(--tool-text, #333);
  resize: vertical;
  line-height: 1.4;
  transition: border-color 0.2s;
}

textarea:focus {
  outline: none;
  border-color: var(--theme-primary, #3b82f6);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

textarea::placeholder {
  color: var(--tool-text-muted, #999);
}
</style>
