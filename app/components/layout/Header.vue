<template>
  <a-layout-header
    class="flex items-center justify-between px-6 shadow-sm h-16 sticky top-0 z-50 transition-colors duration-300 !bg-white dark:!bg-dark-sidebar dark:text-white"
  >
    <!-- Левая часть: Гамбургер -->
    <div class="flex items-center gap-4">
      <MenuOutlined
        v-if="!collapsed"
        class="text-xl cursor-pointer hover:text-blue-500 transition"
        @click="$emit('toggleSidebar')"
      />
    </div>

    <!-- Правая часть: Композиция элементов -->
    <div class="flex items-center gap-6">
      <!-- 1. Переключатель темы -->
      <HeaderThemeToggle />

      <!-- 2. Уведомления -->
      <HeaderNotificationBell />

      <!-- 3. Выбор языка -->
      <HeaderLanguageSelect />

      <!-- 4. Профиль пользователя -->
      <HeaderUserDropdown />
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MenuOutlined } from "@ant-design/icons-vue";

interface Props {
  collapsed: boolean;
}

const props = defineProps<Props>();

defineEmits(["toggleSidebar"]);
</script>

<style scoped>
:deep(.ant-layout-header) {
  padding-inline: 0 !important;
}
</style>
