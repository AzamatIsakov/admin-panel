<template>
  <div>
    <!-- Хедер -->
    <div class="flex flex-col gap-6 mb-8">
      <div class="flex justify-between items-center">
        <h2
          class="text-[32px] font-bold text-[#202224] dark:text-white tracking-tight"
        >
          {{ t("users.title") }}
        </h2>
        <NuxtLink to="/users/create">
          <a-button type="primary" class="bg-blue-600">{{
            t("users.add_user")
          }}</a-button>
        </NuxtLink>
      </div>

      <CommonAppBreadcrumb :items="[{ label: t('users.title') }]" />

      <!-- Фильтры -->
      <div
        class="flex flex-col md:flex-row gap-4 bg-white dark:bg-dark-primary p-4 rounded-[14px] shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <!-- Search -->
        <div class="w-full md:w-1/3">
          <a-input
            v-model:value="searchQuery"
            :placeholder="t('users.filters.search_placeholder')"
            class="custom-input bg-white dark:bg-dark-primary"
            @press-enter="handleSearch"
          >
            <template #prefix>
              <SearchOutlined class="text-gray-400" />
            </template>
          </a-input>
        </div>

        <!-- Role Filter -->
        <a-select
          v-model:value="selectedRole"
          :placeholder="t('users.filters.role_placeholder')"
          class="w-full md:w-1/4 custom-select"
          allow-clear
          @change="handleFilterChange"
        >
          <a-select-option value="admin">{{
            t("users.filters.roles.admin")
          }}</a-select-option>
          <a-select-option value="moderator">{{
            t("users.filters.roles.moderator")
          }}</a-select-option>
          <a-select-option value="user">{{
            t("users.filters.roles.user")
          }}</a-select-option>
        </a-select>

        <!-- Gender Filter -->
        <a-select
          v-model:value="selectedGender"
          :placeholder="t('users.filters.gender_placeholder')"
          class="w-full md:w-1/4 custom-select"
          allow-clear
          @change="handleFilterChange"
        >
          <a-select-option value="male">{{
            t("users.filters.genders.male")
          }}</a-select-option>
          <a-select-option value="female">{{
            t("users.filters.genders.female")
          }}</a-select-option>
        </a-select>

        <!-- Reset -->
        <a-button @click="resetFilters">{{
          t("users.filters.reset")
        }}</a-button>
      </div>
    </div>

    <!-- Таблица -->
    <UserTable
      :users="users"
      :loading="loading"
      :total="total"
      :current="pagination.current"
      :page-size="pagination.pageSize"
      @change="handleTableUpdate"
      @delete="deleteUser"
      @toggleStatus="toggleStatus"
    />
  </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";

const { t } = useI18n();
const {
  users,
  total,
  loading,
  pagination,
  fetchUsers,
  deleteUser,
  toggleStatus,
} = useUsers();

const searchQuery = ref("");
const selectedRole = ref(undefined);
const selectedGender = ref(undefined);

const handleTableUpdate = (params: any) => {
  fetchUsers({
    page: params.page,
    pageSize: params.pageSize,
    search: searchQuery.value,
    role: selectedRole.value,
    gender: selectedGender.value,
  });
};

const handleSearch = () => {
  // Сбрасываем фильтры при поиске (особенность API)
  selectedRole.value = undefined;
  selectedGender.value = undefined;
  fetchUsers({ page: 1, search: searchQuery.value });
};

const handleFilterChange = () => {
  // Сбрасываем поиск при фильтрации
  searchQuery.value = "";
  fetchUsers({
    page: 1,
    role: selectedRole.value,
    gender: selectedGender.value,
  });
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedRole.value = undefined;
  selectedGender.value = undefined;
  fetchUsers({ page: 1 });
};

fetchUsers({ page: 1 });
</script>

<style>
.custom-input .ant-input {
  @apply bg-white dark:bg-dark-primary;
}
/* Фикс для селектов в темной теме */
.dark .custom-select .ant-select-selector {
  @apply !bg-dark-primary !border-gray-600 !text-white;
}
</style>
