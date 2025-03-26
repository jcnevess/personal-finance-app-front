<script setup lang="ts">
const showDeleteModal = ref(false);

function openDeleteModal() {
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}
</script>

<template>
  <div class="wrapper">
    <header>
      <h1>Pots</h1>
      <button>+ Add New Pot</button>
    </header>

    <div class="pots">
      <PotView
        name="Savings"
        :target="2500"
        :total="1500"
        theme="green"
        @open-delete="openDeleteModal"
      />
      <PotDelete
        pot-name="Savings"
        :show-modal="showDeleteModal"
        @close-delete="closeDeleteModal"
      />
      <PotCompose />
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  color: white;
  background-color: var(--color-background-dark);
}

button:hover {
  background-image: linear-gradient(
    180deg,
    rgb(255, 255, 255),
    rgb(255, 255, 255)
  );
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
