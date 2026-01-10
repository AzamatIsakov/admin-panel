<!-- components/header/UserDropdown.vue -->
<template>
  <!-- Контейнер с бордером слева -->
  <div
    class="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-600"
  >
    <a-dropdown>
      <div class="flex items-center gap-3 cursor-pointer group">
        <!-- Аватар -->
        <a-avatar
          :src="authStore.user?.image"
          size="large"
          class="bg-blue-100 border-2 border-transparent group-hover:border-blue-200 transition-all"
        />

        <!-- Текст -->
        <div class="hidden sm:block leading-tight">
          <div
            class="font-bold text-sm text-gray-800 dark:text-white group-hover:text-blue-500 transition-colors"
          >
            {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Admin</div>
        </div>

        <DownOutlined
          class="hidden sm:block text-xs text-gray-400 group-hover:text-blue-500 transition-colors"
        />
      </div>

      <template #overlay>
        <a-menu>
          <div class="px-4 py-2 border-b mb-1">
            <p class="text-xs text-gray-400 m-0">Signed in as</p>
            <p class="font-bold text-gray-800 m-0 truncate w-32">
              {{ authStore.user?.email }}
            </p>
          </div>
          <a-menu-item key="profile">
            <template #icon><UserOutlined /></template>
            Profile
          </a-menu-item>
          <a-menu-item key="settings">
            <template #icon><SettingOutlined /></template>
            Settings
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="logout" danger @click="authStore.logout">
            <template #icon><LogoutOutlined /></template>
            Logout
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import {
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";

const authStore = useAuthStore();
</script>
