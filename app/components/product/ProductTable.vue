<template>
  <div>
    <!-- Таблица -->
    <a-table
      :columns="columns"
      :data-source="products"
      :loading="loading"
      :pagination="false"
      row-key="id"
      class="custom-product-table rounded-[14px] shadow-sm !border !border-gray-100 dark:!border-gray-700 overflow-hidden"
      :scroll="{ x: 800 }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'thumbnail'">
          <div
            class="w-[60px] h-[60px] bg-gray-50 dark:bg-slate-700 rounded-[14px] overflow-hidden flex items-center justify-center"
          >
            <img
              :src="record.thumbnail"
              class="w-full h-full object-cover object-center"
              alt="img"
            />
          </div>
        </template>

        <template v-else-if="column.key === 'title'">
          <span class="font-semibold text-[#202224] dark:text-white text-sm">
            {{ record.title }}
          </span>
        </template>

        <template v-else-if="column.key === 'price'">
          <span class="font-semibold text-[#202224] dark:text-white text-sm">
            ${{ record.price }}
          </span>
        </template>

        <!-- Piece (Stock) -->
        <template v-else-if="column.key === 'stock'">
          <span class="font-semibold text-[#202224] dark:text-white text-sm">
            {{ record.stock }}
          </span>
        </template>

        <!-- Available Color -->
        <template v-else-if="column.key === 'colors'">
          <div class="flex gap-4">
            <!-- Генерируем рандомные цвета на основе ID для стабильности -->
            <div
              v-for="color in getFakeColors(record.id)"
              :key="color"
              class="size-5 rounded-full border border-gray-200"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
        </template>

        <!-- Action Buttons -->
        <template v-else-if="column.key === 'action'">
          <div class="flex">
            <!-- Edit Button -->
            <NuxtLink :to="`/products/${record.id}`">
              <button
                class="-mr-px py-2 px-4 flex items-center justify-center rounded-l-lg border-r-0 bg-[#FAFBFD] dark:bg-gray-700 border border-[#D5D5D5] dark:border-gray-600 hover:bg-blue-50 transition-colors text-gray-500 dark:text-gray-300"
              >
                <EditOutlined class="text-base" />
              </button>
            </NuxtLink>

            <!-- Delete Button -->
            <a-popconfirm
              title="Delete this product?"
              @confirm="$emit('delete', record.id)"
            >
              <button
                class="-ml-px py-2 px-4 flex items-center justify-center rounded-r-lg bg-[#FAFBFD] dark:bg-gray-700 border border-[#D5D5D5] dark:border-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors text-red-500"
              >
                <DeleteOutlined class="text-base" />
              </button>
            </a-popconfirm>
          </div>
        </template>
      </template>
    </a-table>

    <!-- Кастомный Футер -->
    <div
      class="py-4 flex flex-col md:flex-row justify-between items-center gap-4 px-2"
    >
      <!-- Левая часть: Showing text + Per Page Select -->
      <div class="flex items-center gap-4">
        <div class="text-gray-500 dark:text-gray-400 text-sm font-medium">
          Showing {{ showingStart }}-{{ showingEnd }} of {{ total }}
        </div>

        <!-- Выбор количества на страницу -->
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400">Rows:</span>
          <a-select
            :value="pageSize"
            class="min-w-[70px]"
            size="small"
            @change="handlePageSizeChange"
          >
            <a-select-option :value="9">9</a-select-option>
            <a-select-option :value="20">20</a-select-option>
            <a-select-option :value="50">50</a-select-option>
          </a-select>
        </div>
      </div>

      <!-- Правая часть: Пагинация -->
      <div
        class="flex items-center rounded border border-gray-200 dark:border-gray-600 overflow-hidden"
      >
        <button
          class="px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 border-r border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 transition"
          :disabled="current <= 1"
          @click="$emit('change', { page: current - 1, pageSize })"
        >
          <LeftOutlined />
        </button>
        <button
          class="px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 text-gray-500 dark:text-gray-300 transition"
          :disabled="showingEnd >= total"
          @click="$emit('change', { page: current + 1, pageSize })"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EditOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import type { Product } from "~/types/product";
import type { TableProps } from "ant-design-vue";
import type { SelectValue } from "ant-design-vue/es/select";

const props = defineProps<{
  products: Product[];
  loading: boolean;
  total: number;
  current: number;
  pageSize: number;
}>();

// Обновляем emit, чтобы он принимал объект с настройками
const emit = defineEmits(["change", "delete"]);

const showingStart = computed(() => {
  if (props.total === 0) return 0;
  return (props.current - 1) * props.pageSize + 1;
});

const showingEnd = computed(() => {
  const end = props.current * props.pageSize;
  return end > props.total ? props.total : end;
});

// Добавляем sorter: true для колонок, которые хотим сортировать
const columns = [
  { title: "Image", key: "thumbnail", width: 100 },
  {
    title: "Product Name",
    dataIndex: "title",
    key: "title",
    sorter: true, // Включаем сортировку
    width: 400,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    // Сюда можно добавить filters, если захотим фильтрацию
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    sorter: true, // Включаем сортировку
  },
  { title: "Piece", dataIndex: "stock", key: "stock", sorter: true },
  { title: "Available Color", key: "colors" },
  { title: "Action", key: "action", width: 120 },
];

const getFakeColors = (id: number) => {
  const colors = ["#000000", "#7E7E7E", "#F93C65", "#4880FF", "#FFB648"];
  const count = (id % 3) + 1;
  return colors.slice(id % colors.length, (id % colors.length) + count);
};

// Обработчик смены размера страницы
const handlePageSizeChange = (val: number | SelectValue) => {
  // Сбрасываем на 1 страницу при смене размера
  emit("change", { page: 1, pageSize: val });
};

// Обработчик изменений таблицы (Сортировка)
// Ant Design Table сам вызывает это событие при клике на заголовок
const handleTableChange: TableProps["onChange"] = (
  pagination,
  filters,
  sorter: any
) => {
  const sortParams = {
    sortBy: sorter.field, // 'price', 'title' и т.д.
    order:
      sorter.order === "ascend"
        ? "asc"
        : sorter.order === "descend"
        ? "desc"
        : undefined,
  };

  // Эмитим изменения наверх
  emit("change", {
    page: props.current,
    pageSize: props.pageSize,
    ...sortParams,
  });
};
</script>

<style>
.custom-product-table .ant-table-tbody {
  @apply !bg-transparent dark:!bg-dark-primary !transition-all !duration-300;
}

.custom-product-table .ant-table-thead .ant-table-cell {
  @apply bg-transparent dark:bg-[#323D4E] !transition-all !duration-300;
}

.custom-product-table
  .ant-table-tbody
  .ant-table-row
  .ant-table-cell:first-of-type {
  @apply !border-b-0 px-[30px] py-6;
}

.custom-product-table .ant-table-thead .ant-table-cell::before {
  @apply hidden;
}

.custom-product-table .ant-table-thead .ant-table-cell {
  @apply pt-4 pb-3 text-sm font-semibold text-[#202224] dark:text-white;
}

.custom-product-table
  .ant-table-tbody
  .ant-table-row:last-of-type
  .ant-table-cell,
.custom-product-table .ant-table-tbody .ant-table-cell:last-of-type {
  @apply !border-b-0;
}

.custom-product-table
  .ant-table-tbody
  .ant-table-row:first-of-type
  .ant-table-cell {
  @apply !border-t-0;
}
</style>
