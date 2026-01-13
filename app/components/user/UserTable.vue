<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="users"
      :loading="loading"
      :pagination="false"
      row-key="id"
      class="custom-user-table rounded-[14px] shadow-sm !border !border-gray-100 dark:!border-gray-700 overflow-hidden"
      :scroll="{ x: 1000 }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <!-- NAME -->
        <template v-if="column.key === 'name'">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
              <img :src="record.image" class="w-full h-full object-cover" />
            </div>
            <div class="flex flex-col">
              <span
                class="font-bold text-[#202224] dark:text-white text-sm leading-tight"
              >
                {{ record.firstName }} {{ record.lastName }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ record.email }}
              </span>
            </div>
          </div>
        </template>

        <!-- INFO -->
        <template v-else-if="column.key === 'info'">
          <div class="text-sm text-[#202224] dark:text-gray-200">
            <!-- Локализуем пол: male -> Мужской -->
            <span class="capitalize">{{
              t(`users.filters.genders.${record.gender}`)
            }}</span
            >,
            {{ record.age }}
          </div>
        </template>

        <!-- PHONE -->
        <template v-else-if="column.key === 'phone'">
          <div class="text-sm text-gray-600 dark:text-gray-400 font-mono">
            {{ record.phone }}
          </div>
        </template>

        <!-- ROLE -->
        <template v-else-if="column.key === 'role'">
          <span
            class="px-3 py-1 rounded-full text-xs font-semibold capitalize"
            :class="getRoleBadgeClass(record.role)"
          >
            {{ t(`users.filters.roles.${record.role}`) }}
          </span>
        </template>

        <!-- STATUS -->
        <template v-else-if="column.key === 'status'">
          <a-switch
            :checked="record.isActive"
            @change="$emit('toggleStatus', record.id)"
          />
        </template>

        <!-- ACTION -->
        <template v-else-if="column.key === 'action'">
          <div class="flex">
            <NuxtLink :to="`/users/${record.id}`">
              <button
                class="-mr-px py-2 px-4 flex items-center justify-center rounded-l-lg border-r-0 bg-[#FAFBFD] dark:bg-gray-700 border border-[#D5D5D5] dark:border-gray-600 hover:bg-blue-50 transition-colors text-gray-500 dark:text-gray-300"
              >
                <EditOutlined class="text-base" />
              </button>
            </NuxtLink>
            <a-popconfirm
              title="Delete this user?"
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

    <!-- FOOTER-->
    <div
      class="py-4 flex flex-col md:flex-row justify-between items-center gap-4 px-2"
    >
      <!-- Левая часть -->
      <div class="flex items-center gap-4">
        <div class="text-gray-500 dark:text-gray-400 text-sm font-medium">
          <!-- ИНТЕРПОЛЯЦИЯ СТРОК -->
          {{
            t("common.pagination.showing", {
              start: showingStart,
              end: showingEnd,
              total: total,
            })
          }}
        </div>

        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400">{{
            t("common.pagination.rows")
          }}</span>
          <a-select
            :value="pageSize"
            class="min-w-[70px]"
            size="small"
            @change="(val) => $emit('change', { page: 1, pageSize: val })"
          >
            <a-select-option :value="10">10</a-select-option>
            <a-select-option :value="20">20</a-select-option>
            <a-select-option :value="50">50</a-select-option>
          </a-select>
        </div>
      </div>

      <!-- Правая часть (кнопки) -->
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
import type { User } from "~/types/user";

const props = defineProps<{
  users: User[];
  loading: boolean;
  total: number;
  current: number;
  pageSize: number;
}>();

const emit = defineEmits(["change", "delete", "toggleStatus"]);
const { t } = useI18n();

const showingStart = computed(() =>
  props.total === 0 ? 0 : (props.current - 1) * props.pageSize + 1
);
const showingEnd = computed(() => {
  const end = props.current * props.pageSize;
  return end > props.total ? props.total : end;
});

const columns = computed(() => [
  { title: t("users.columns.name"), key: "name", width: 280 },
  { title: t("users.columns.info"), key: "info", width: 140 },
  {
    title: t("users.columns.username"),
    dataIndex: "username",
    key: "username",
  },
  { title: t("users.columns.phone"), key: "phone", width: 160 },
  { title: t("users.columns.role"), key: "role", width: 120 },
  { title: t("users.columns.status"), key: "status", width: 100 },
  { title: t("users.columns.action"), key: "action", width: 120 },
]);

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    case "moderator":
      return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
  }
};

const handleTableChange = () => {
  emit("change", { page: props.current, pageSize: props.pageSize });
};
</script>

<style>
.custom-user-table .ant-table-tbody {
  @apply !bg-transparent dark:!bg-dark-primary !transition-all !duration-300;
}

.custom-user-table .ant-table-thead .ant-table-cell {
  @apply bg-transparent dark:bg-[#323D4E] !transition-all !duration-300;
}

.custom-user-table
  .ant-table-tbody
  .ant-table-row
  .ant-table-cell:first-of-type {
  @apply !border-b-0 px-[30px] py-4;
}

.custom-user-table .ant-table-thead .ant-table-cell::before {
  @apply hidden;
}

.custom-user-table .ant-table-thead .ant-table-cell {
  @apply pt-4 pb-3 text-sm font-semibold text-[#202224] dark:text-white;
}

.custom-user-table .ant-table-tbody .ant-table-row:last-of-type .ant-table-cell,
.custom-user-table .ant-table-tbody .ant-table-cell:last-of-type {
  @apply !border-b-0;
}

.custom-user-table
  .ant-table-tbody
  .ant-table-row:first-of-type
  .ant-table-cell {
  @apply !border-t-0;
}
</style>
