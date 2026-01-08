<template>
  <a-layout-sider
    width="240"
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    class="sidebar-transition !bg-white dark:!bg-dark-sidebar"
  >
    <!-- Логотип -->
    <div class="h-16 flex items-center justify-center">
      <h1
        class="text-2xl font-black m-0 tracking-tight transition-colors duration-300 text-gray-800 dark:text-white"
      >
        <span v-if="!collapsed" class="flex items-center gap-2">
          <span class="text-blue-500 text-3xl">D</span>ashStack
        </span>
        <span v-else class="text-blue-500 text-3xl">DS</span>
      </h1>
    </div>

    <!-- Меню -->
    <div
      class="flex flex-col justify-between h-[calc(100vh-64px)] overflow-y-auto py-4"
    >
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        :theme="themeStore.isDark ? 'dark' : 'light'"
        :items="menuItems"
        class="border-none custom-menu !bg-transparent"
        @click="handleMenuClick"
      />

      <!-- Нижние пункты -->
      <div class="mb-4">
        <a-menu
          mode="inline"
          :theme="themeStore.isDark ? 'dark' : 'light'"
          :selectable="false"
          class="border-none custom-menu !bg-transparent"
        >
          <a-menu-item key="settings" class="!my-1">
            <template #icon><SettingOutlined /></template>
            <span>Settings</span>
          </a-menu-item>
          <a-menu-item key="logout" danger @click="handleLogout" class="!my-1">
            <template #icon><PoweroffOutlined /></template>
            <span>Logout</span>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
// Скрипт оставляем тот же, что был в прошлом шаге (с исправленными типами ItemType)
import { h, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { ItemType, MenuProps } from "ant-design-vue";
import {
  AppstoreOutlined,
  ShopOutlined,
  HeartOutlined,
  InboxOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  PoweroffOutlined,
  TeamOutlined,
  TableOutlined,
} from "@ant-design/icons-vue";

const props = defineProps<{ collapsed: boolean }>();
const themeStore = useThemeStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const state = reactive({ selectedKeys: ["dashboard"] });

watch(
  () => route.path,
  (path) => {
    if (path === "/") state.selectedKeys = ["dashboard"];
    else if (path.startsWith("/products")) state.selectedKeys = ["products"];
    else if (path.startsWith("/users")) state.selectedKeys = ["users"];
  },
  { immediate: true }
);

const menuItems: ItemType[] = [
  {
    key: "dashboard",
    icon: () => h(AppstoreOutlined),
    label: "Dashboard",
    title: "Dashboard",
  },
  {
    key: "products",
    icon: () => h(ShopOutlined),
    label: "Products",
    title: "Products",
  },
  {
    key: "favorites",
    icon: () => h(HeartOutlined),
    label: "Favorites",
    title: "Favorites",
  },
  {
    key: "inbox",
    icon: () => h(InboxOutlined),
    label: "Inbox",
    title: "Inbox",
  },
  {
    key: "orders",
    icon: () => h(UnorderedListOutlined),
    label: "Order Lists",
    title: "Order Lists",
  },
  { type: "divider", class: "my-4 opacity-50" },
  { key: "users", label: "Team", icon: () => h(TeamOutlined), title: "Team" },
  {
    key: "table",
    label: "Table",
    icon: () => h(TableOutlined),
    title: "Table",
  },
];

const handleMenuClick: MenuProps["onClick"] = (info) => {
  const key = info.key as string;
  if (key === "dashboard") router.push("/");
  else if (key === "products") router.push("/products");
  else if (key === "users") router.push("/users");
};

const handleLogout = () => authStore.logout();
</script>

<style>
/* Стили для активного элемента остаются, они универсальны */
.custom-menu .ant-menu-item-selected {
  background-color: #4880ff !important;
  color: white !important;
  border-radius: 8px;
  margin: 0 10px;
  width: calc(100% - 20px);
}

/* А вот ховер для темной темы делаем через CSS селектор .dark (Tailwind тут сложнее применить к внутренностям AntD) */
.dark .custom-menu .ant-menu-item:hover:not(.ant-menu-item-selected) {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: none !important;
}
</style>
