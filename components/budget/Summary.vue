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
    <ClientOnly>
      <div class="anchor chart-anchor">
        <apexchart type="donut" :options="chartOptions" :series="series" />
        <div class="inner-wheel">
          <div class="highlight">$338</div>
          <p>of $975 limit</p>
        </div>
      </div>
    </ClientOnly>
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

.chart-anchor {
  width: min-content;
  align-self: center;
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

.color-bar {
  width: 5px;
  height: 20px;
  border-radius: 3px;
  background-color: attr(data-color type(<color>), red);
}

.highlight {
  font-size: 1.75rem;
  font-weight: bold;
}

.inner-wheel {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: hwb(0 100% 0% / 0.5);
  width: 60%;
  aspect-ratio: 1;
  pointer-events: none;
  touch-action: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
}

.inner-wheel p {
  font-size: 0.75rem;
}

.summary {
  border-radius: 10px;
  padding: clamp(0.5rem, calc(-4.3rem + 24vw), 2rem);
  background-color: white;
  align-self: start;
  display: flex;
  flex-direction: column;
}

.apexcharts-canvas {
  margin: auto;
}
</style>
