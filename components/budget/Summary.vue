<script setup lang="ts">
import { getFormattedAmount } from "~/helpers/helpers";

const appStore = useAppStore();
const montlyBudget = appStore.getMonthlyBudgetSummary(7);

const { data, labels, colors } = defineProps<{
  data: number[];
  labels: string[];
  colors: string[];
}>();

const chartOptions = {
  chart: {
    id: "budget",
    width: "80%",
  },
  labels: labels,
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  tooltip: {
    fillSeriesColor: false,
  },
  style: {
    fontFamily: "PublicSans",
  },
  colors: colors,
  stroke: { show: false },
  responsive: [
    {
      breakpoint: 420,
      options: {
        chart: {
          width: "75%",
        },
      },
    },
  ],
};

const series = data;
</script>

<template>
  <div class="summary">
    <BudgetGraph :data :labels :colors />
    <div class="summary-info">
      <h2>Spending Summary</h2>
      <div class="categories">
        <div
          v-for="budget in montlyBudget"
          :key="budget.category"
          class="category"
        >
          <div class="color-bar" :data-color="budget.theme" />
          <p>{{ budget.category }}</p>
          <div class="money-info">
            {{ getFormattedAmount(budget.monthlyExpenses).slice(1) }}
          </div>
          <div class="money-target">
            of {{ getFormattedAmount(budget.maximum).slice(1) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
h2 {
  margin-block: 1rem;
}

.money-info {
  font-weight: bold;
}

.money-target {
  font-size: 0.75rem;
  color: var(--color-text-paragraph);
}

.category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-block: 1rem;
}

.category:not(:first-child) {
  border-top: 1px solid var(--color-separator);
}

.category p {
  flex-grow: 1;
}

.summary {
  border-radius: 10px;
  padding: clamp(0.5rem, calc(-4.3rem + 24vw), 2rem);
  background-color: white;
  align-self: start;
  display: flex;
  flex-direction: column;
}
</style>
