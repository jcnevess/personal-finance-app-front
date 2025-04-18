<script setup lang="ts">
import type { Budget, Transaction } from "~/helpers/DTO";
import {
  getFormattedAmount,
  getFormattedDate,
  getImageURI,
} from "~/helpers/helpers";

const { budget, transactions } = defineProps<{
  budget: Budget;
  transactions: Transaction[];
}>();

const spentMoney = computed(
  () =>
    -1 * // we need the positive value
    transactions
      .filter((trans) => new Date(trans.date).getMonth() === 7)
      .map((trans) => trans.amount)
      .reduce((t1, t2) => t1 + t2)
);

const freeMoney = computed(() => budget.maximum - spentMoney.value);
const percentUsed = computed(() => spentMoney.value / budget.maximum);

const showOptionsMenu = ref(false);

function toggleOptionsMenu() {
  showOptionsMenu.value = !showOptionsMenu.value;
}
</script>

<template>
  <article class="card">
    <div class="heading">
      <div class="heading-info">
        <div class="budget-color" />
        <h2>{{ budget.category }}</h2>
      </div>
      <div class="heading-controls menu-wrapper" @click="toggleOptionsMenu">
        <IconsIconEllipsis />
        <ul v-show="showOptionsMenu" class="menu-options">
          <li class="menu-option">Edit Budget</li>
          <li class="menu-option menu-option-delete">Delete Budget</li>
        </ul>
      </div>
    </div>
    <p>{{ `Maximum of $${budget.maximum.toFixed(2)}` }}</p>
    <div class="meter">
      <div class="meter-bar">
        <div class="meter-bar-indicator" />
      </div>
    </div>
    <div class="budget-infos">
      <div class="budget-info budget-spent">
        <div class="budget-info-bar" />
        <div class="budget-info-data">
          <p>Spent</p>
          <div class="emphasis">
            {{ getFormattedAmount(spentMoney).slice(1) }}
          </div>
        </div>
      </div>
      <div class="budget-info">
        <div class="budget-info-bar" />
        <div class="budget-info-data">
          <p>Free</p>
          <div class="emphasis">
            {{ getFormattedAmount(freeMoney).slice(1) }}
          </div>
        </div>
      </div>
    </div>
    <div class="latest-spendings">
      <div class="latest-heading">
        <h3>Latest Spending</h3>
        <div class="latest-spending-seemore">
          <p>See All</p>
          <IconsIconCaretRight />
        </div>
      </div>
      <ul class="spendings">
        <li
          v-for="transaction in transactions.slice(0, 3)"
          :key="transaction.date"
          class="spending"
        >
          <div class="client-info emphasis">
            <img
              :src="getImageURI(transaction.avatar)"
              :alt="transaction.name"
            />
            {{ transaction.name }}
          </div>
          <div class="transaction-info">
            <div class="emphasis">
              {{ getFormattedAmount(transaction.amount) }}
            </div>
            <p>{{ getFormattedDate(transaction.date) }}</p>
          </div>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
p {
  font-size: 0.75rem;
}

h2 {
  margin-block: unset;
}

.menu-option:not(.menu-option-delete) {
  color: var(--color-text-paragraph);
}

.heading-controls {
  color: var(--color-text-primary);
  cursor: pointer;
}

.transaction-info p {
  font-size: 0.75rem;
}

.transaction-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: end;
}

.spending {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding-block: 0.5rem;
}

.spending:not(:first-child) {
  border-top: 1px solid var(--color-separator);
}

.spending:last-child {
  padding-bottom: 0;
}

.client-info {
  max-width: 150px;
}

.client-info img {
  width: 32px;
  border-radius: 50%;
}

.latest-spending-seemore:active,
.latest-spending-seemore:hover {
  text-decoration: underline;
}

.latest-spending-seemore {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-paragraph);
  cursor: pointer;
}

.latest-heading h3 {
  font-size: 1.1rem;
}

.latest-heading {
  display: flex;
  justify-content: space-between;
}

.latest-spendings {
  background-color: var(--color-background-bright);
  border-radius: 10px;
  padding-block: 1rem;
  padding-inline: clamp(
    0.5rem,
    calc(-1.1rem + 8vw),
    1rem
  ); /* min: 8px, max: 16px */
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.budget-info-data p {
  font-size: 0.8rem;
}

.budget-info-data {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.budget-spent .budget-info-bar {
  background-color: v-bind("budget.theme");
}

.budget-info-bar {
  background-color: var(--color-background-bright);
  width: 5px;
  height: auto;
  border-radius: 5px;
}

.budget-info {
  flex-grow: 1;
  display: flex;
  gap: 1rem;
}

.budget-infos {
  display: flex;
}

.meter-bar {
  padding: 0.25rem;
  height: 32px;
}

.meter-bar-indicator {
  width: v-bind("`${Math.min(percentUsed, 1) * 100}%`");
  background-color: v-bind("budget.theme");
}

.card {
  background-color: white;
  border-radius: 10px;
  padding-block: clamp(
    1rem,
    calc(-2.2rem + 16vw),
    2rem
  ); /* min: 16px, max: 32px */
  padding-inline: clamp(
    0.5rem,
    calc(-4.3rem + 24vw),
    2rem
  ); /* min: 8px, max: 32px */
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.heading-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.budget-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: v-bind("budget.theme");
}
</style>
