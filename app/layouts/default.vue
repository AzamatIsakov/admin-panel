<template>
  <a-layout class="min-h-screen">
    <!-- БОКОВОЕ МЕНЮ (SIDEBAR) -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible breakpoint="lg">
      <!-- Логотип (адаптируй под свой дизайн) -->
      <div
        class="h-16 m-4 bg-white/20 flex items-center justify-center text-white font-bold rounded"
      >
        <span v-if="!collapsed">ADMIN PANEL</span>
        <span v-else>AP</span>
      </div>

      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="dashboard">
          <template #icon><DashboardOutlined /></template>
          <NuxtLink to="/">Dashboard</NuxtLink>
        </a-menu-item>

        <a-menu-item key="products">
          <template #icon><ShoppingOutlined /></template>
          <NuxtLink to="/products">Товары</NuxtLink>
        </a-menu-item>

        <a-menu-item key="users">
          <template #icon><UserOutlined /></template>
          <NuxtLink to="/users">Пользователи</NuxtLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <!-- ШАПКА (HEADER) -->
      <a-layout-header
        style="background: #fff; padding: 0 24px"
        class="flex justify-between items-center shadow-sm"
      >
        <!-- Левая часть хедера (заголовок или хлебные крошки) -->
        <h2 class="text-xl font-semibold m-0">Админ панель</h2>

        <!-- Правая часть (Профиль, Язык, Тема) -->
        <div class="flex items-center gap-4">
          <!-- Сюда позже добавим переключатель темы и языков -->

          <a-dropdown>
            <a
              class="ant-dropdown-link flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              @click.prevent
            >
              <a-avatar :src="authStore.user?.image" size="small" />
              <span>{{ authStore.user?.firstName }}</span>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  <UserOutlined /> Профиль
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout" danger @click="authStore.logout">
                  <LogoutOutlined /> Выйти
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- КОНТЕНТ СТРАНИЦЫ -->
      <a-layout-content
        style="
          margin: 24px 16px;
          padding: 24px;
          background: #fff;
          min-height: 280px;
        "
      >
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import {
  DashboardOutlined,
  ShoppingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";

const collapsed = ref(false);
const selectedKeys = ref(["dashboard"]);
const authStore = useAuthStore();

// Логика подсветки активного пункта меню
const route = useRoute();
watch(
  () => route.path,
  (path) => {
    if (path.includes("/products")) selectedKeys.value = ["products"];
    else if (path.includes("/users")) selectedKeys.value = ["users"];
    else selectedKeys.value = ["dashboard"];
  },
  { immediate: true }
);
</script>
