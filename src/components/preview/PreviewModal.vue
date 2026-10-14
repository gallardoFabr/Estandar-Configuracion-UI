<template>
  <transition name="modal">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button v-if="showClose" class="close-btn" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  type: { type: String, default: 'form' },
  showClose: { type: Boolean, default: true }
});
defineEmits(['close']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--theme-modal-overlay, rgba(0, 0, 0, 0.5));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-container {
  background: #fff;
  border-radius: var(--theme-modal-radius, var(--theme-radius-base));
  width: var(--theme-modal-width, 500px);
  max-width: 90vw;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}
.modal-header {
  padding: var(--theme-modal-padding, 1rem);
  border-bottom: 1px solid var(--theme-table-border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h3 {
  margin: 0;
  font-size: var(--theme-title-section-size);
  font-weight: var(--theme-title-section-weight);
}
.close-btn {
  background: none;
  border: none;
  font-size: var(--theme-text-normal-size);
  font-weight: var(--theme-text-normal-weight);
  cursor: pointer;
  color: var(--theme-text-secondary);
}
.modal-body {
  padding: var(--theme-modal-padding, 1rem);
}
.modal-footer {
  padding: var(--theme-modal-padding, 1rem);
  border-top: 1px solid var(--theme-table-border-color);
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  background-color: #f8fafc;
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-container {
  transition: transform 0.3s ease;
}
.modal-enter-from .modal-container {
  transform: scale(0.95);
}
</style>
