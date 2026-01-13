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

      <!-- Поиск -->
      <div class="relative w-full md:w-[400px]">
        <a-input
          v-model:value="searchQuery"
          placeholder="Search product name"
          class="custom-input rounded-full px-4 py-2 bg-white dark:bg-dark-primary border-gray-200 dark:border-gray-600"
          @pressEnter="handleSearch"
        >
          <template #prefix>
            <SearchOutlined class="text-gray-400 mr-2" />
          </template>
        </a-input>
      </div>
    </div>

    <!-- Таблица -->
    <ProductTable
      :products="products"
      :loading="loading"
      :total="total"
      :current="pagination.current"
      :page-size="pagination.pageSize"
      @change="handlePageChange"
      @delete="deleteProduct"
    />
  </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";

const { t } = useI18n();
// Используем наш исправленный useProducts
const { products, total, loading, pagination, fetchProducts, deleteProduct } =
  useProducts();

const searchQuery = ref("");

// Функция смены страницы (приходит из кнопок < > в таблице)
const handlePageChange = (newPage: number) => {
  fetchProducts({
    page: newPage,
    search: searchQuery.value,
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
