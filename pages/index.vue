<script setup lang="ts">
import {
  getFormattedAmount,
  getFormattedDate,
  getImageURI,
} from "~/helpers/helpers";

const store = useAppStore();
const { balance, pots, transactions } = storeToRefs(store);
const monthlyBudgets = ref(store.getMonthlyBudgetSummary(7));
const recurringBillsSummary = ref(
  store.getRecurringBillsSummary("2024-07-22T00:00:00Z")
);

const totalSavedPots = computed(() =>
  pots.value.map((pot) => pot.total).reduce((t1, t2) => t1 + t2)
);

const orderedPots = computed(() =>
  pots.value.toSorted((p1, p2) => p2.total - p1.total)
);

const lastTransactions = computed(() =>
  transactions.value
    .toSorted(
      (t1, t2) => new Date(t2.date).valueOf() - new Date(t1.date).valueOf()
    )
    .slice(0, 5)
);

const recurringBillsTotals = computed(() => {
  return [
    {
      label: "Paid Bills",
      value: recurringBillsSummary.value.paid.reduce(
        (acc, bill) => acc + bill.amount,
        0
      ),
      theme: "#277C78",
    },
    {
      label: "Total upcoming",
      value: recurringBillsSummary.value.upcoming.reduce(
        (acc, bill) => acc + bill.amount,
        0
      ),
      theme: "#F2CDAC",
    },
    {
      label: "Due Soon",
      value: recurringBillsSummary.value.dueSoon.reduce(
        (acc, bill) => acc + bill.amount,
        0
      ),
      theme: "#82C9D7",
    },
  ];
});
</script>

<template>
  <div class="wrapper">
    <h1>Overview</h1>
    <section class="balance-cards">
      <div
        v-for="[balanceName, balanceValue] in Object.entries(balance)"
        :key="balanceName"
        class="balance-card"
      >
        <h2>
          {{ balanceName === "current" ? "current balance" : balanceName }}
        </h2>
        <p class="highlighted-amount">
          {{ getFormattedAmount(balanceValue).slice(1) }}
        </p>
      </div>
    </section>

    <section class="preview pots-preview">
      <div class="preview-header">
        <h2>Pots</h2>
        <NuxtLink to="/pots" class="link">
          See Details <IconCaretRight
        /></NuxtLink>
      </div>
      <div class="pots-body">
        <div class="pots-highlight">
          <IconPot class="pot-icon" />
          <div class="highlight-info">
            <p>Total Saved</p>
            <p class="highlighted-amount">{{ `$${totalSavedPots}` }}</p>
          </div>
        </div>
        <div class="pot-items">
          <div
            v-for="pot of orderedPots.slice(0, 4)"
            :key="pot.name"
            class="pot-item"
          >
            <div class="color-bar" :data-color="pot.theme" />
            <div class="pot-info">
              <p class="pot-title">{{ pot.name }}</p>
              <p class="emphasis">{{ `$${pot.total}` }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="preview budgets-preview">
      <div class="preview-header">
        <h2>Budgets</h2>
        <NuxtLink to="/budgets" class="link"
          >See Details <IconCaretRight
        /></NuxtLink>
      </div>
      <div class="budgets-body">
        <BudgetGraph
          :data="monthlyBudgets.map((bud) => bud.monthlyExpenses)"
          :labels="monthlyBudgets.map((bud) => bud.category)"
          :colors="monthlyBudgets.map((bud) => bud.theme)"
        />
        <div class="budgets">
          <div
            v-for="budget of monthlyBudgets"
            :key="budget.category"
            class="budget"
          >
            <div class="color-bar" :data-color="budget.theme" />
            <div class="budget-info">
              <p class="budget-title">{{ budget.category }}</p>
              <p class="emphasis">{{ `$${budget.monthlyExpenses}` }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="preview transactions-preview">
      <div class="preview-header">
        <h2>Transactions</h2>
        <NuxtLink to="/transactions" class="link"
          >View All <IconCaretRight
        /></NuxtLink>
      </div>
      <div class="transactions">
        <div
          v-for="transaction of lastTransactions"
          :key="transaction.category"
          class="transaction"
        >
          <div class="client-info">
            <img
              :src="getImageURI(transaction.avatar)"
              :alt="transaction.name"
            />
            <div class="client-name">{{ transaction.name }}</div>
          </div>
          <div class="transaction-info">
            <p
              class="emphasis"
              :class="{
                income: transaction.amount >= 0,
                expense: transaction.amount < 0,
              }"
            >
              {{ getFormattedAmount(transaction.amount) }}
            </p>
            <p class="transaction-date">
              {{ getFormattedDate(transaction.date) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="preview preview-bills">
      <div class="preview-header">
        <h2>Recurring Bills</h2>
        <NuxtLink to="/recurring" class="link"
          >See Details <IconCaretRight
        /></NuxtLink>
      </div>
      <div class="recurring-cards">
        <div
          v-for="total of recurringBillsTotals"
          :key="total.label"
          class="recurring-card"
          :data-theme="total.theme"
        >
          <p>{{ total.label }}</p>
          <p class="emphasis">{{ getFormattedAmount(total.value).slice(1) }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
h2 {
  margin-block: 0;
}

.balance-cards {
  display: flex;
  gap: 1rem;
}

.balance-card {
  background-color: white;
  border-radius: 10px;
  padding: 1rem;
  flex-grow: 1;
}

.balance-card:first-of-type {
  background-color: var(--color-background-dark);
  color: white;
}

.balance-card h2 {
  font-size: 1rem;
  font-weight: normal;
  margin: 0 0 1rem;
  text-transform: capitalize;
}

.highlighted-amount {
  color: inherit;
  font-weight: bold;
  font-size: 2rem;
}

.preview {
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link {
  text-decoration: none;
  cursor: pointer;
  color: var(--color-text-paragraph);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.pots-body {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.pots-highlight {
  background-color: var(--color-background-bright);
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.pot-icon {
  color: var(--color-highlight);
}

.highlight-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pot-items {
  display: flex;
  gap: 1rem;
}

.pot-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  min-width: 120px;
}

.pot-item .color-bar {
  height: 48px;
}

.pot-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pot-title {
  font-size: 0.75rem;
}

.budgets-body {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.budgets {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.budget {
  display: flex;
  gap: 0.75rem;
}

.budget-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.budget-title {
  font-size: 0.75rem;
}

.budget .color-bar {
  height: auto;
}

.transaction {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1rem;
}

.transaction:not(:first-of-type) {
  border-top: 1px solid var(--color-separator);
}

.client-info img {
  border-radius: 50%;
  width: 32px;
  aspect-ratio: 1;
}

.client-name {
  font-size: 0.9rem;
  font-weight: bold;
}

.transaction-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: end;
}

.transaction-date {
  font-size: 0.75rem;
}

.income {
  color: var(--color-highlight);
}

.expense {
  color: var(--color-destructive-action);
}

.recurring-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.recurring-card {
  padding: 1.5rem;
  border-radius: 10px;
  background-color: var(--color-background-bright);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-left: 4px solid attr(data-theme type(<color>), red);
}
</style>
