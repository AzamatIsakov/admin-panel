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

const themeStore = useThemeStore();

// Данные (Фейковые для демо, имитируем продажи за год)
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
const dataValues = [
  12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 20000, 45000, 38000,
  42000,
];

// 1. Данные графика с Градиентом
const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: "Sales",
      data: dataValues,
      borderColor: "#4880FF", // Синий цвет из макета
      backgroundColor: (context: ScriptableContext<"line">) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, "rgba(72, 128, 255, 0.4)"); // Сверху синий полупрозрачный
        gradient.addColorStop(1, "rgba(72, 128, 255, 0)"); // Снизу прозрачный
        return gradient;
      },
      borderWidth: 3,
      tension: 0.4, // Делает линию плавной (кривая Безье)
      pointBackgroundColor: "#fff",
      pointBorderColor: "#4880FF",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true, // Включаем заливку под графиком
    },
  ],
}));

// 2. Настройки (Оси, сетка, тултипы)
// Computed нужен, чтобы при смене темы перерисовывались цвета сетки
const chartOptions = computed(() => {
  const textColor = themeStore.isDark ? "#E5E7EB" : "#6B7280"; // gray-200 / gray-500
  const gridColor = themeStore.isDark ? "#374151" : "#F3F4F6"; // gray-700 / gray-100

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
        beginAtZero: true,
        grid: {
          color: gridColor, // Цвет горизонтальных линий
          borderDash: [5, 5], // Пунктирная линия
        },
        ticks: {
          color: textColor,
          callback: (value: any) => `${value / 1000}k`, // Сокращаем 10000 до 10k
        },
        border: {
          display: false, // Убираем левую линию оси Y
        },
      },
    },
  };
});
</script>
