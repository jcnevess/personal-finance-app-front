<script setup lang="ts">
import type { Pot } from "~/helpers/DTO";

const showDeleteModal = ref(false);
const showComposeModal = ref(false);
const showTransactionModal = ref(false);

const withdrawalInProgress = ref(false);

const currentPot = ref<Pot | undefined>(undefined);
const defaultPot = ref<Pot>({
  name: "",
  target: 0,
  total: 0,
  theme: "black",
});

const store = useAppStore();

function openDeleteModal(pot: Pot) {
  currentPot.value = pot;
  showDeleteModal.value = true;
}

function closeDeleteModal() {
  showDeleteModal.value = false;
  currentPot.value = undefined;
}

function openComposeModal(pot?: Pot) {
  currentPot.value = pot;
  showComposeModal.value = true;
}

function closeComposeModal() {
  showComposeModal.value = false;
  currentPot.value = undefined;
}

function openTransactionModal(isWithdrawal: boolean, pot: Pot) {
  currentPot.value = pot;
  showTransactionModal.value = true;
  withdrawalInProgress.value = isWithdrawal;
}

function closeTransactionModal() {
  showTransactionModal.value = false;
  currentPot.value = undefined;
  withdrawalInProgress.value = false;
}

function startAddPot() {
  currentPot.value = undefined;
  openComposeModal(currentPot.value);
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
        v-for="pot in store.pots"
        :key="pot.name"
        :pot="pot"
        @open-delete="openDeleteModal(pot)"
        @open-compose="openComposeModal(pot)"
        @open-transaction="openTransactionModal($event.isWithdrawal, pot)"
      />
      <PotDelete
        pot-name="Savings"
        :show-modal="showDeleteModal"
        @close-delete="closeDeleteModal"
      />
      <PotCompose
        :pot="currentPot"
        :show-modal="showComposeModal"
        @close-compose="closeComposeModal"
      />
      <PotTransaction
        :pot="currentPot || defaultPot"
        :show-modal="showTransactionModal"
        :is-withdrawal="withdrawalInProgress"
        @close-transaction="closeTransactionModal"
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

.pots {
  display: grid;
  grid-template-columns: auto auto;
  gap: 1.5rem;
}

@media (max-width: 880px) {
  .pots {
    grid-template-columns: auto;
  }
}
</style>
