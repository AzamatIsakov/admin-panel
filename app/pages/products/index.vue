<template>
  <div>
    <!-- Хедер страницы: Заголовок + Поиск -->
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
    >
      <h2
        class="text-[32px] font-bold text-[#202224] dark:text-white tracking-tight"
      >
        {{ t("menu.products") }}
      </h2>

      <div class="flex gap-4 items-center">
        <NuxtLink to="/products/create">Создать товар</NuxtLink>
        <!-- Поиск -->
        <div class="relative w-full md:w-[400px]">
          <a-input
            v-model:value="searchQuery"
            placeholder="Search product name"
            class="custom-input rounded-full px-4 py-2 bg-white dark:bg-dark-primary border-gray-200 dark:border-gray-600"
            @press-enter="handleSearch"
          >
            <template #prefix>
              <SearchOutlined class="text-gray-400 mr-2" />
            </template>
          </a-input>
        </div>
      </div>
    </div>

    <!-- Таблица -->
    <ProductTable
      :products="products"
      :loading="loading"
      :total="total"
      :current="pagination.current"
      :page-size="pagination.pageSize"
      @change="handleTableUpdate"
      @delete="deleteProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";

const { t } = useI18n();
const { products, total, loading, pagination, fetchProducts, deleteProduct } =
  useProducts();

const searchQuery = ref("");

// Единый обработчик всех изменений (страница, размер, сортировка)
const handleTableUpdate = (params: {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}) => {
  fetchProducts({
    page: params.page ?? pagination.current,
    pageSize: params.pageSize ?? pagination.pageSize,
    search: searchQuery.value,
    sortBy: params.sortBy,
    order: params.order,
  });
};

// Поиск
const handleSearch = () => {
  fetchProducts({
    page: 1,
    search: searchQuery.value,
  });
};

fetchProducts({ page: 1 });
</script>

<style>
.custom-input .ant-input {
  @apply bg-white dark:bg-dark-primary;
}
</style>
