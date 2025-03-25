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
  <div>
    <h1>Pots</h1>
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
  </div>
</template>
