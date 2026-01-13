<template>
  <a-layout-header
    class="flex items-center justify-between shadow-sm !h-[70px] top-0 z-50 transition-colors duration-300 !bg-white dark:!bg-dark-primary dark:text-white"
    :class="uiStore.isDesktop ? '!px-[30px]' : '!px-6'"
  >
    <!-- Левая часть: Гамбургер -->
    <div class="flex items-center gap-4">
      <!-- Кнопка для ДЕСКТОПА (сворачивание) -->
      <MenuOutlined
        v-if="!collapsed && uiStore.isDesktop"
        class="text-xl cursor-pointer hover:text-blue-500 transition"
        @click="$emit('toggleSidebar')"
      />

      <!-- Кнопка для МОБИЛКИ (открытие Drawer) -->
      <MenuOutlined
        class="lg:hidden text-xl cursor-pointer hover:text-blue-500 transition"
        @click="$emit('openMobileMenu')"
      />
    </div>

    <!-- Правая часть: Скрываем на мобилках -->
    <div v-if="uiStore.isDesktop" class="flex items-center gap-[26px]">
      <HeaderThemeToggle />
      <HeaderNotificationBell />
      <HeaderLanguageSelect />
      <HeaderUserDropdown />
    </div>

    <!-- Для мобилки можно оставить только колокольчик -->
    <div class="lg:hidden flex items-center">
      <HeaderNotificationBell />
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MenuOutlined } from "@ant-design/icons-vue";

interface Props {
  collapsed: boolean;
}
defineProps<Props>();
defineEmits(["toggleSidebar", "openMobileMenu"]);

const uiStore = useUiStore();
</script>
