<template>
  <button 
    class="preview-button" 
    :class="[`variant-${variant}`, { 'is-loading': loading }]"
    :disabled="variant === 'disabled' || loading"
  >
    <span v-if="loading" class="spinner"></span>
    <component v-else-if="iconComponent" :is="iconComponent" class="btn-icon" />
    <span>{{ loading ? 'Guardando...' : label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue';
import * as LucideIcons from '@lucide/vue';

const props = defineProps({
  variant: { type: String, default: 'primary' },
  label: { type: String, required: true },
  loading: { type: Boolean, default: false },
  icon: { type: String, default: '' }
});

const iconComponent = computed(() => {
  return props.icon ? LucideIcons[props.icon] : null;
});
</script>

<style scoped>
.preview-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 var(--theme-btn-primary-padding-x);
  height: var(--theme-btn-primary-height);
  border-radius: var(--theme-btn-primary-radius);
  font-weight: var(--theme-text-normal-weight);
  font-family: var(--theme-font-family);
  font-size: var(--theme-text-normal-size);
  cursor: pointer;
  transition: filter .15s ease, transform .05s ease;
}
.preview-button:active:not(:disabled) { transform: translateY(1px); }
.preview-button:disabled { pointer-events: none; }
.variant-primary { background-color: var(--theme-btn-primary-bg); color: var(--theme-btn-primary-color); border: var(--theme-btn-primary-border); border-radius: var(--theme-btn-primary-radius); height: var(--theme-btn-primary-height); padding-inline: var(--theme-btn-primary-padding-x); font-weight: var(--theme-text-normal-weight); }
.variant-secondary { background-color: var(--theme-btn-secondary-bg); color: var(--theme-btn-secondary-color); border: var(--theme-btn-secondary-border); border-radius: var(--theme-btn-primary-radius); height: var(--theme-btn-primary-height); padding-inline: var(--theme-btn-primary-padding-x); font-weight: var(--theme-text-normal-weight); }
.variant-cancel { background-color: var(--theme-btn-cancel-bg); color: var(--theme-btn-cancel-color); border: var(--theme-btn-cancel-border); border-radius: var(--theme-btn-primary-radius); height: var(--theme-btn-primary-height); padding-inline: var(--theme-btn-primary-padding-x); font-weight: var(--theme-text-normal-weight); }
.variant-retry { background-color: var(--theme-btn-retry-bg); color: var(--theme-btn-retry-color); border: var(--theme-btn-retry-border); border-radius: var(--theme-btn-primary-radius); height: var(--theme-btn-primary-height); padding-inline: var(--theme-btn-primary-padding-x); font-weight: var(--theme-text-normal-weight); }
.variant-delete { background-color: var(--theme-btn-delete-bg); color: var(--theme-btn-delete-color); border: var(--theme-btn-delete-border); border-radius: var(--theme-btn-primary-radius); height: var(--theme-btn-primary-height); padding-inline: var(--theme-btn-primary-padding-x); font-weight: var(--theme-text-normal-weight); }
.variant-disabled { background-color: var(--theme-btn-disabled-bg); color: var(--theme-btn-disabled-color); border: var(--theme-btn-disabled-border); border-radius: var(--theme-btn-primary-radius); height: var(--theme-btn-primary-height); padding-inline: var(--theme-btn-primary-padding-x); font-weight: var(--theme-text-normal-weight); }
.preview-button:hover:not(:disabled) { filter: brightness(.95); }
.btn-icon { width: var(--theme-icon-size); height: var(--theme-icon-size); }
.spinner { width: 16px; height: 16px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: spin .75s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
</style>
