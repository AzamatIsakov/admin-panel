<!-- pages/index.vue -->
<template>
  <div>
    <h2
      class="text-[30px] font-bold mb-8 text-[#202224] dark:text-white tracking-tight"
    >
      {{ t("dashboard.value") }}
    </h2>

    <!-- Скелетон загрузки -->
    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] mb-8"
    >
      <div
        v-for="i in 4"
        :key="i"
        class="h-[154px] bg-white dark:bg-dark-primary rounded-[14px] animate-pulse"
      ></div>
    </div>

    <!-- Реальные карточки -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] mb-8"
    >
      <DashboardStatCard
        v-for="item in dashboardItems"
        :title="item.title"
        :value="item.value"
        :trend="item.trend"
        :color="item.color"
      >
        <template #icon><component :is="item.icon" /></template>
      </DashboardStatCard>
    </div>

    <!-- Секция графика -->
    <div
      class="bg-white dark:bg-dark-primary p-8 rounded-[14px] shadow-sm mb-8 transition-colors duration-300"
    >
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold text-[#202224] dark:text-white">
          Sales Details
        </h3>

        <!-- Дропдаун выбора месяца (фейковый для вида) -->
        <a-select
          defaultValue="october"
          class="w-32"
          :class="{ 'dark-select': themeStore.isDark }"
        >
          <a-select-option value="october">October</a-select-option>
          <a-select-option value="november">November</a-select-option>
        </a-select>
      </div>

      <div class="h-[350px] w-full">
        <ClientOnly>
          <DashboardSalesChart />

          <!-- Скелетон на случай долгой загрузки чанка с графиком -->
          <template #fallback>
            <div
              class="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded animate-pulse"
            >
              Loading Chart...
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  UsergroupAddOutlined,
  CodeSandboxOutlined,
  LineChartOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons-vue";

const { t } = useI18n();
const { stats, loading, fetchStats } = useDashboard();
const themeStore = useThemeStore();

fetchStats();

const dashboardItems = computed(() => [
  // Total User (Синий)
  {
    title: t("dashboard.stat_card.total_user"),
    value: stats.users,
    trend: 8.5,
    color: "blue",
    icon: UsergroupAddOutlined,
  },
  // Total Order (Желтый)
  {
    title: t("dashboard.stat_card.total_order"),
    value: stats.orders,
    trend: 1.3,
    color: "yellow",
    icon: CodeSandboxOutlined,
  },
  // Total Sales (Зеленый)
  {
    title: t("dashboard.stat_card.total_sales"),
    value: `$${stats.sales}`,
    trend: -4.3,
    color: "green",
    icon: LineChartOutlined,
  },
  // Total Pending / Posts (Красный)
  {
    title: t("dashboard.stat_card.total_pending"),
    value: stats.posts,
    trend: 1.8,
    color: "red",
    icon: FieldTimeOutlined,
  },
]);
</script>
