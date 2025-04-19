<script setup lang="ts">
const { data, labels, colors } = defineProps<{
  data: number[];
  labels: string[];
  colors: string[];
}>();

const chartOptions = {
  chart: {
    id: "budget",
    width: "75%",
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
          width: "70%",
        },
      },
    },
  ],
};

const series = data;
</script>

<template>
  <ClientOnly>
    <div class="anchor chart-anchor">
      <apexchart type="donut" :options="chartOptions" :series="series" />
      <div class="inner-wheel">
        <div class="highlight">$338</div>
        <p>of $975 limit</p>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped>
.chart-anchor {
  width: min-content;
  align-self: center;
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

.apexcharts-canvas {
  margin: auto;
}
</style>
