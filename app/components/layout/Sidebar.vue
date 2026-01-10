<template>
  <a-layout-sider
    width="240"
    collapsedWidth="85"
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    class="!bg-white dark:!bg-dark-primary !transition-all !duration-300"
  >
    <!-- Логотип -->
    <div class="h-[70px] flex items-center justify-center">
      <h1 class="text-[#202224] dark:text-white">
        <NuxtLink
          to="/"
          v-if="!collapsed"
          class="font-extrabold text-xl leading-none hover:text-[#202224] hover:dark:text-white"
        >
          <span class="text-blue-500">Dash</span>Stack
        </NuxtLink>
        <MenuUnfoldOutlined
          v-else
          @click="$emit('toggleSidebar')"
          class="text-xl cursor-pointer hover:text-blue-500 transition"
        />
      </h1>
    </div>

    <!-- Меню -->
    <div
      class="flex flex-col justify-between h-[calc(100vh-70px)] overflow-y-auto py-4"
    >
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        :theme="themeStore.isDark ? 'dark' : 'light'"
        :items="menuItems"
        class="custom-menu border-none !bg-transparent"
        @click="handleMenuClick"
      />

      <!-- Нижние пункты (Settings/Logout) -->
      <div class="mb-4">
        <a-menu
          mode="inline"
          :theme="themeStore.isDark ? 'dark' : 'light'"
          :selectable="false"
          class="custom-menu border-none !bg-transparent"
        >
          <a-menu-item key="settings" class="!my-1">
            <template #icon>
              <LucideSettings />
            </template>
            <span>{{ t("menu.settings") }}</span>
          </a-menu-item>

          <a-menu-item key="logout" danger @click="handleLogout" class="!my-1">
            <template #icon>
              <LucidePower />
            </template>
            <span>{{ t("menu.logout") }}</span>
          </a-menu-item>
        </a-menu>
      </div>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined } from "@ant-design/icons-vue";

interface Props {
  collapsed: boolean;
}

const props = defineProps<Props>();
defineEmits(["toggleSidebar"]);

const themeStore = useThemeStore();
const { t } = useI18n();

const { state, menuItems, handleMenuClick, handleLogout } = useSidebar();
</script>

<style>
/* Твои стили без изменений */
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
