<template>
  <div class="relative w-full h-[300px]">
    <Line :data="chartData" :options="chartOptions" ref="chartRef" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ScriptableContext,
} from "chart.js";
import { Line } from "vue-chartjs";

const { t } = useI18n();

const themeStore = useThemeStore();

interface Props {
  dataValues: number[]; // Массив чисел для графика
  labels: string[]; // Подписи оси X
}

const props = defineProps<Props>();

const chartData = computed(() => ({
  labels: props.labels, // Используем пропс
  datasets: [
    {
      label: "Sales",
      data: props.dataValues,
      borderColor: "#4880FF",
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(72, 128, 255, 0.4)");
        gradient.addColorStop(1, "rgba(72, 128, 255, 0)");
        return gradient;
      },
      borderWidth: 3,
      tension: 0.4,
      pointBackgroundColor: "#fff",
      pointBorderColor: "#4880FF",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
    },
  ],
}));

// Регистрация модулей Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Данные (Фейковые для демо)
const labels = computed(() => [
  t("dashboard.sales_chart.months.jan"),
  t("dashboard.sales_chart.months.feb"),
  t("dashboard.sales_chart.months.mar"),
  t("dashboard.sales_chart.months.apr"),
  t("dashboard.sales_chart.months.may"),
  t("dashboard.sales_chart.months.jun"),
  t("dashboard.sales_chart.months.jul"),
  t("dashboard.sales_chart.months.aug"),
  t("dashboard.sales_chart.months.sep"),
  t("dashboard.sales_chart.months.oct"),
  t("dashboard.sales_chart.months.nov"),
  t("dashboard.sales_chart.months.dec"),
]);

// Настройки (Оси, сетка, тултипы)
const chartOptions = computed(() => {
  const textColor = themeStore.isDark ? "#E5E7EB" : "#6B7280";
  const gridColor = themeStore.isDark ? "#374151" : "#F3F4F6";

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Скрываем легенду сверху, у нас свой заголовок
      },
      tooltip: {
        backgroundColor: themeStore.isDark ? "#1F2937" : "#fff",
        titleColor: themeStore.isDark ? "#fff" : "#111827",
        bodyColor: themeStore.isDark ? "#D1D5DB" : "#4B5563",
        borderColor: themeStore.isDark ? "#374151" : "#E5E7EB",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: any) => ` $${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Убираем вертикальные линии сетки
        },
        ticks: {
          color: textColor,
        },
      },
      y: {
        min: 20,
        max: 100,
        beginAtZero: false,
        grid: {
          color: gridColor, // Цвет горизонтальных линий
          borderDash: [5, 5], // Пунктирная линия
        },
        ticks: {
          stepSize: 20,
          color: textColor,
          callback: (value: any) => `${value}%`,
        },
        border: {
          display: false, // Убираем левую линию оси Y
        },
      },
    },
  };
});
</script>
