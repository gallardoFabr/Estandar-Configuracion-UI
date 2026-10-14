<template>
  <div class="preview-input-wrapper">
    <label v-if="label" class="preview-label">
      {{ label }} <span v-if="required" class="required">*</span>
    </label>
    <input 
      :type="type"
      class="preview-input"
      :class="{ 'has-error': error, 'is-disabled': disabled }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <span v-if="error" class="error-msg">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  placeholder: String,
  required: Boolean,
  error: String,
  disabled: Boolean,
  type: { type: String, default: 'text' }
});
defineEmits(['update:modelValue']);
</script>

<style scoped>
.preview-input-wrapper { display:flex; flex-direction:column; gap:.25rem; margin-bottom:1rem; font-family:var(--theme-font-family); }
.preview-label { font-size:var(--theme-text-secondary-size); color:var(--theme-label-color); font-weight:var(--theme-text-secondary-weight); }
.required { color:var(--theme-error); }
.preview-input { width:100%; box-sizing:border-box; height:var(--theme-input-height); padding:0 var(--theme-input-padding-x); border:1px solid var(--theme-input-border); border-radius:var(--theme-input-radius); font-size:var(--theme-text-normal-size); font-family:var(--theme-font-family); font-weight:var(--theme-text-normal-weight); outline:none; transition:border-color .2s; background-color:var(--theme-input-bg); color:var(--theme-text-primary); }
.preview-input::placeholder { color:var(--theme-placeholder-color); }
.preview-input:focus { border-color:var(--theme-input-border-focus); }
.preview-input.has-error { border-color:var(--theme-input-border-error); }
.preview-input.is-disabled { background-color:var(--theme-input-disabled-bg, #f1f5f9); color:var(--theme-input-disabled-color, #94a3b8); cursor:not-allowed; }
.error-msg { font-size:var(--theme-error-font-size, var(--theme-text-small-size)); font-weight:var(--theme-text-small-weight); color:var(--theme-error-color); }
</style>
