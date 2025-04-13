<script setup lang="ts">
const store = useAppStore();
const budgets = ref(store.budgets);
</script>

<template>
  <div class="wrapper">
    <div class="heading">
      <h1>Budgets</h1>
      <button>New Budget</button>
    </div>
    <div class="content">
      <BudgetSummary
        :data="[15, 150, 133, 40]"
        :labels="budgets.map((bud) => bud.category)"
        :colors="budgets.map((bud) => bud.theme)"
      />
      <div class="budgets">
        <BudgetSnippet
          v-for="budget in budgets"
          :key="budget.category"
          :budget
          :transactions="store.getTransactionsFromBudget(budget.category)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.content {
  display: grid;
  grid-template-columns: 45% 1fr;
  gap: 1.5rem;
}

.budgets {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>
