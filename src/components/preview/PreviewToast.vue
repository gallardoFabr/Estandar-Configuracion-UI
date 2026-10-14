<template>
  <transition name="toast">
    <div v-if="show" class="preview-toast" :class="[`pos-${position}`, `type-${type}`]">
      <div class="toast-content">
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: String,
  type: { type: String, default: 'info' },
  position: { type: String, default: 'bottom-right' }
});
</script>

<style scoped>
.preview-toast {
  position: fixed;
  padding: 1rem;
  background: #fff;
  border-radius: var(--theme-radius-base);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-left: 4px solid var(--theme-info);
  z-index: 1050;
  min-width: 250px;
}
.type-success { border-left-color: var(--theme-success); }
.type-error { border-left-color: var(--theme-error); }
.type-warning { border-left-color: var(--theme-warning); }

.pos-top-right { top: 1rem; right: 1rem; }
.pos-top-left { top: 1rem; left: 1rem; }
.pos-bottom-right { bottom: 1rem; right: 1rem; }
.pos-bottom-left { bottom: 1rem; left: 1rem; }
.pos-center { top: 1rem; left: 50%; transform: translateX(-50%); }

.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
