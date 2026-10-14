<template>
  <div class="screen">
    <PreviewCard title="Información del Colegio">
      <div class="form-grid">
        <PreviewInput label="Nombre del colegio" modelValue="Colegio San Martín" />
        <PreviewInput label="RUC" modelValue="20123456789" />
        <PreviewInput label="Dirección" modelValue="Av. Educación 123" />
        <PreviewInput label="Teléfono" modelValue="(01) 555-1234" />
      </div>
      <div class="form-actions">
        <PreviewButton variant="primary" label="Guardar" />
      </div>
    </PreviewCard>
  </div>
</template>

<script setup>
import PreviewCard from '../PreviewCard.vue';
import PreviewInput from '../PreviewInput.vue';
import PreviewButton from '../PreviewButton.vue';
</script>

<style scoped>
.screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}
</style>
