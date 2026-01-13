<template>
  <div
    class="flex flex-col h-full bg-white dark:bg-dark-primary transition-colors duration-300"
  >
    <!-- Логотип (Виден всегда) -->
    <div class="h-[70px] flex items-center justify-center shrink-0 mx-4">
      <h1 class="dark:text-white">
        <NuxtLink
          to="/"
          v-if="!collapsed || isMobile"
          class="font-extrabold text-xl leading-none hover:text-[#202224] hover:dark:text-white"
          @click="$emit('close')"
        >
          <span class="text-blue-500">Dash</span>Stack
        </NuxtLink>
        <MenuUnfoldOutlined
          v-else
          @click="$emit('toggle-collapse')"
          class="text-xl cursor-pointer hover:text-blue-500 transition"
        />
      </h1>
    </div>

    <!-- Блок профиля (ТОЛЬКО ДЛЯ МОБИЛОК) -->
    <div
      v-if="isMobile"
      class="mb-2 px-6 py-4 flex flex-col gap-4 border-b border-gray-100 dark:border-gray-700"
    >
      <!-- Профиль -->
      <div class="flex items-center gap-3">
        <a-avatar
          :src="authStore.user?.image"
          size="large"
          class="bg-blue-100"
        />
        <div class="flex flex-col">
          <span class="font-bold text-sm text-gray-800 dark:text-white">
            {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">Admin</span>
        </div>
      </div>

      <!-- Управление (Язык и Тема в ряд) -->
      <div class="flex items-center justify-between mt-2">
        <HeaderThemeToggle />
        <HeaderLanguageSelect />
      </div>
    </div>

    <!-- Основное Меню -->
    <div class="flex flex-col justify-between flex-1 overflow-y-auto py-2">
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        :theme="themeStore.isDark ? 'dark' : 'light'"
        :items="menuItems"
        class="custom-menu border-none !bg-transparent"
        @click="handleMobileClick"
      />

      <!-- Нижние пункты -->
      <div class="mb-4 shrink-0">
        <a-menu
          mode="inline"
          :theme="themeStore.isDark ? 'dark' : 'light'"
          :selectable="false"
          class="custom-menu border-none !bg-transparent"
        >
          <a-menu-item key="settings" class="!my-1">
            <template #icon><LucideSettings /></template>
            <span>{{ t("menu.settings") }}</span>
          </a-menu-item>

          <a-menu-item key="logout" danger @click="handleLogout" class="!my-1">
            <template #icon><LucidePower /></template>
            <span>{{ t("menu.logout") }}</span>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined } from "@ant-design/icons-vue";

interface Props {
  collapsed?: boolean;
  isMobile?: boolean;
}

defineProps<Props>();

const emit = defineEmits(["toggle-collapse", "close"]);

const themeStore = useThemeStore();
const authStore = useAuthStore();
const { t } = useI18n();

const { state, menuItems, handleMenuClick, handleLogout } = useSidebar();

const handleMobileClick: typeof handleMenuClick = (info) => {
  handleMenuClick(info);
  emit("close");
};
</script>

<style>
.custom-menu {
  @apply !space-y-1;
}

.custom-menu.ant-menu-inline-collapsed .ant-menu-item {
  @apply !px-8;
}

.custom-menu.ant-menu-inline-collapsed .ant-menu-item-selected {
  @apply !bg-transparent !text-[#4880ff];
}

.custom-menu .ant-menu-item {
  @apply !py-4 !px-10 !m-0 !w-full !h-[52px] !rounded-none  text-sm !leading-[19px] font-semibold tracking-[0.3px];
}

.custom-menu .ant-menu-item .ant-menu-item-icon {
  @apply relative z-10 size-5;
}

.custom-menu .ant-menu-item .ant-menu-title-content {
  @apply relative z-10 !ml-4;
}

.custom-menu .ant-menu-item-selected {
  @apply !relative  !bg-transparent !text-white select-none cursor-default;
}

.custom-menu .ant-menu-item-selected::before {
  content: "";
  @apply absolute left-0 top-0 -translate-x-1/2 w-2 rounded h-full bg-[#4880ff];
}

.custom-menu .ant-menu-item-selected::after {
  content: "";
  @apply absolute !bg-[#4880ff] left-1/2 top-0 w-[calc(100%_-_48px)] rounded-md !-translate-x-1/2;
}
</style>
