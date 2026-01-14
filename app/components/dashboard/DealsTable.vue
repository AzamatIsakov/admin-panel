<template>
  <div
    class="p-6 bg-white dark:bg-dark-primary rounded-[14px] shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
  >
    <!-- Заголовок -->
    <h3 class="mb-6 text-xl font-bold text-[#202224] dark:text-white">
      Deals Details
    </h3>

    <!-- Таблица -->
    <a-table
      :columns="columns"
      :data-source="deals"
      :pagination="false"
      row-key="id"
      class="deals-table"
      :scroll="{ x: 800 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'product'">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-hidden shrink-0"
            >
              <img :src="record.thumbnail" class="w-full h-full object-cover" />
            </div>
            <span
              class="font-medium text-[#202224] dark:text-white text-sm truncate max-w-[200px]"
            >
              {{ record.title }}
            </span>
          </div>
        </template>

        <!-- Status Badge -->
        <template v-else-if="column.key === 'status'">
          <span
            class="px-3 py-1 rounded-full text-xs font-semibold"
            :class="getStatusColor(record.status)"
          >
            {{ t(`dashboard.status.${record.status.toLowerCase()}`) }}
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { products, fetchProducts } = useProducts();

// Мокаем дополнительные данные (Дата, Статус, Локация), которых нет в API
const deals = computed(() => {
  return products.value.slice(0, 5).map((p) => ({
    ...p,
    location: "6096 Marjolaine Landing", // Фейк из макета
    date: "12.09.2019 - 12.53 PM", // Фейк
    status: getRandomStatus(p.id), // Фейк
  }));
});

// Колонки
const columns = computed(() => [
  { title: t("dashboard.columns.product"), key: "product", width: 250 },
  {
    title: t("dashboard.columns.location"),
    dataIndex: "location",
    key: "location",
  },
  { title: t("dashboard.columns.date"), dataIndex: "date", key: "date" },
  { title: t("dashboard.columns.piece"), dataIndex: "stock", key: "piece" },
  {
    title: t("dashboard.columns.amount"),
    dataIndex: "price",
    key: "amount",
    customRender: ({ text }: any) => `$${text}`,
  },
  { title: t("dashboard.columns.status"), key: "status" },
]);

// Хелперы для фейковых статусов
const getRandomStatus = (id: number) => {
  const statuses = ["Delivered", "Pending", "Canceled"];
  return statuses[id % 3];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "Pending":
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
    case "Canceled":
      return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-gray-100";
  }
};

fetchProducts({ pageSize: 5 });
</script>

<style>
.deals-table .ant-table-tbody {
  @apply !bg-transparent dark:!bg-dark-primary !transition-all !duration-300;
}

.deals-table .ant-table-thead .ant-table-cell:first-of-type {
  @apply !rounded-l-xl;
}

.deals-table .ant-table-thead .ant-table-cell:last-of-type {
  @apply !rounded-r-xl;
}

.deals-table .ant-table-thead .ant-table-cell {
  @apply bg-[#323D4E];
}

.deals-table .ant-table {
  @apply bg-transparent;
}
</style>
