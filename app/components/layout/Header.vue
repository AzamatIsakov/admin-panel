<template>
  <a-layout-header
    class="flex items-center justify-between px-6 shadow-sm h-16 sticky top-0 z-50 transition-colors duration-300 !bg-white dark:!bg-dark-sidebar dark:text-white"
  >
    <!-- Левая часть -->
    <div v-if="!collapsed" class="flex items-center gap-4">
      <MenuFoldOutlined
        class="text-xl cursor-pointer hover:text-blue-500 transition"
        @click="$emit('toggleSidebar')"
      />
    </div>

    <!-- Правая часть -->
    <div class="ml-auto flex items-center gap-6">
      <!-- Свитч темы -->
      <a-switch
        :checked="themeStore.isDark"
        checked-children="🌙"
        un-checked-children="☀️"
        @change="themeStore.toggleTheme"
      />

      <!-- Уведомления -->
      <a-badge count="6" :offset="[-2, 5]" class="cursor-pointer">
        <BellOutlined
          class="text-xl transition-colors text-gray-600 dark:text-gray-300"
        />
      </a-badge>

      <!-- Язык -->
      <a-dropdown>
        <div
          class="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-200"
        >
          <img
            src="https://flagcdn.com/w20/gb.png"
            alt="en"
            class="rounded-sm"
          />
          <span class="hidden sm:block font-medium">English</span>
          <DownOutlined class="text-xs text-gray-400" />
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item>English</a-menu-item>
            <a-menu-item>Uzbek</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <!-- Профиль -->
      <div
        class="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-600"
      >
        <a-avatar
          :src="authStore.user?.image"
          size="large"
          class="bg-blue-100"
        />
        <div class="hidden sm:block leading-tight">
          <div class="font-bold text-sm text-gray-800 dark:text-white">
            {{ authStore.user?.firstName }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Admin</div>
        </div>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import {
  MenuOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";

interface Props {
  collapsed: boolean;
}

const props = defineProps<Props>();
defineEmits(["toggleSidebar"]);

const authStore = useAuthStore();
const themeStore = useThemeStore();
</script>

<style scoped>
:deep(.ant-layout-header) {
  padding-inline: 0 !important;
}
</style>
