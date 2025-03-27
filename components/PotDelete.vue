<script setup lang="ts">
const props = defineProps<{ potName: string; showModal: boolean }>();
const emit = defineEmits<{ closeDelete: [] }>();

const modal = useTemplateRef("modal");

onUpdated(() => {
  if (props.showModal) {
    modal.value?.showModal();
  } else {
    modal.value?.close();
  }
});
</script>

<template>
  <dialog ref="modal">
    <div class="dialog-wrapper">
      <header>
        <h1>Delete '{{ props.potName }}'?</h1>
        <div
          class="button-close"
          role="button"
          title="Close Modal"
          @click="emit('closeDelete')"
        >
          <IconsIconCloseModal />
        </div>
      </header>
      <p>
        Are you sure you want to delete this pot? This action cannot be
        reversed, and all the data inside it will be removed forever.
      </p>
      <button class="button-destructive">Yes, Confirm Deletion</button>
      <button>No, Go Back</button>
    </div>
  </dialog>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

p {
  font-size: 0.9rem;
}

.button-close {
  color: var(--color-text-paragraph);
  cursor: pointer;
}
</style>
