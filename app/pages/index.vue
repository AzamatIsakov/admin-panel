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

    <!-- Место под график (следующий шаг) -->
    <div
      class="bg-white dark:bg-dark-primary p-8 rounded-[14px] shadow-sm min-h-[400px]"
    >
      <h3 class="text-xl font-bold mb-4 dark:text-white">Sales Details</h3>
      <div
        class="flex items-center justify-center h-64 text-gray-400 bg-gray-50 dark:bg-dark-bg rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700"
      >
        График будет здесь
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
