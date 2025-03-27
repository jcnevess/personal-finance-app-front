<script setup lang="ts">
import type { Pot } from "~/helpers/DTO";

const showDeleteModal = ref(false);
const showComposeModal = ref(false);

const defaultPot = ref<Pot | undefined>({
  name: "Savings",
  target: 2500,
  total: 1500,
  theme: "green",
});

function openDeleteModal() {
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
}

function openComposeModal() {
  showComposeModal.value = true;
}

function closeComposeModal() {
  showComposeModal.value = false;
}

function startAddPot() {
  defaultPot.value = undefined;
  openComposeModal();
}
</script>

<template>
  <div class="wrapper">
    <header>
      <h1>Pots</h1>
      <button @click="startAddPot">+ Add New Pot</button>
    </header>

    <div class="pots">
      <PotView
        name="Savings"
        :target="2500"
        :total="1500"
        theme="green"
        @open-delete="openDeleteModal"
        @open-compose="openComposeModal"
      />
      <PotDelete
        pot-name="Savings"
        :show-modal="showDeleteModal"
        @close-delete="closeDeleteModal"
      />
      <PotCompose
        :pot="defaultPot"
        :show-modal="showComposeModal"
        @close-compose="closeComposeModal"
      />
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
