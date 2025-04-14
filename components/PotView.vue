<script setup lang="ts">
import type { Pot } from "~/helpers/DTO";

const { pot } = defineProps<{ pot: Pot }>();

const emit = defineEmits<{
  openDelete: [];
  openCompose: [pot?: Pot];
  openTransaction: [{ isWithdrawal: boolean }];
}>();

const showOptions = ref(false);

const progress = computed(() => (pot.total * 100) / pot.target);

function formatDecimal(numberToFormat: number) {
  return numberToFormat.toFixed(2);
}

function toggleOptions() {
  showOptions.value = !showOptions.value;
}

const defaultPot: Pot = {
  name: "Savings",
  target: 2500,
  total: 1500,
  theme: "green",
};
</script>

<template>
  <article>
    <header>
      <div class="color-indicator" />
      <h2>{{ pot.name }}</h2>
      <div class="menu-wrapper" @click="toggleOptions">
        <IconsIconEllipsis class="menu-options-toggler" />
        <menu v-if="showOptions" class="menu-options">
          <li class="menu-option" @click="emit('openCompose', defaultPot)">
            Edit Pot
          </li>
          <li
            class="menu-option menu-option-delete"
            @click="emit('openDelete')"
          >
            Delete Pot
          </li>
        </menu>
      </div>
    </header>
    <main>
      <div class="total-saved">
        <p class="total-saved-text">Total Saved</p>
        <p class="balance-display">
          {{ `\$${formatDecimal(pot.total)}` }}
        </p>
      </div>
      <div class="meter">
        <div class="meter-bar">
          <div class="meter-bar-indicator" />
        </div>
        <div class="meter-info">
          <p class="meter-percentage">
            {{ `${formatDecimal(progress)}%` }}
          </p>
          <p class="meter-target">
            {{ `Target of \$${pot.target.toLocaleString("en-US")}` }}
          </p>
        </div>
      </div>
      <div class="controls">
        <button
          class="control-button"
          @click="emit('openTransaction', { isWithdrawal: false })"
        >
          + Add Money
        </button>
        <button
          class="control-button"
          @click="emit('openTransaction', { isWithdrawal: true })"
        >
          Withdraw
        </button>
      </div>
    </main>
  </article>
</template>

<style scoped>
article {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 300px;
  padding: 2rem;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

header svg {
  color: var(--color-text-primary);
}

main {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  flex-grow: 1;
}

.color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: v-bind("pot.theme");
}

.total-saved {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-saved-text {
  font-size: 0.9rem;
}

.meter-info {
  display: flex;
  justify-content: space-between;
}

.controls {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

.control-button {
  flex-grow: 1;
  color: black;
  background-color: var(--color-background-bright);
}

.control-button:hover,
.control-button:active {
  background-color: white;
  outline: 1px solid var(--color-background-dark);
}

.meter-bar-indicator {
  background-color: v-bind("pot.theme");
  width: v-bind("`${progress}%`");
}

@media (max-width: 375px) {
  article {
    padding-inline: clamp(
      1rem,
      calc(-4.818rem + 29.091vw),
      2rem
    ); /* min: 16px, max: 32px */
  }
}
</style>
