<template>
  <div class="flex items-center gap-3">
    <a-dropdown trigger="click" overlay-class-name="custom-dropdown">
      <div class="flex items-center gap-5 cursor-pointer group">
        <!-- Аватар -->
        <a-avatar
          :src="authStore.user?.image"
          size="large"
          class="bg-slate-300 size-11"
        />

        <!-- Текст -->
        <div class="flex items-center gap-[26px]">
          <div>
            <div
              class="font-bold text-sm leading-snug text-[#404040] dark:text-white group-hover:text-blue-500 transition-colors"
            >
              {{ authStore.user?.firstName }} {{ authStore.user?.lastName }}
            </div>
            <div
              v-if="authStore.user?.role"
              class="mt-[3px] text-xs leading-snug font-semibold text-gray-500 dark:text-gray-400"
            >
              {{ capitalizeFirst(authStore.user.role) }}
            </div>
          </div>

          <LucideCircleChevronDown class="stroke-1 size-[18px]" />
        </div>
      </div>

      <template #overlay>
        <a-menu @click="handleSelect">
          <template v-for="(item, index) in userMenuItems" :key="item.key">
            <a-menu-divider v-if="index" class="!my-0" />

            <a-menu-item
              :id="item.key"
              class="!px-5 !py-3 !rounded-none"
              :danger="item.key === 'logout'"
            >
              <template #icon>
                <component :is="item.icon" class="size-5 !mr-2.5" />
              </template>
              {{ item.label }}
            </a-menu-item>
          </template>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import type { MenuProps } from "ant-design-vue";
import {
  LucideRefreshCcw,
  LucideUserCog,
  LucideKeyRound,
  LucideLogOut,
} from "lucide-vue-next";

const { t } = useI18n();

const authStore = useAuthStore();

const userMenuItems = computed(() => [
  {
    key: "manage-account",
    icon: LucideUserCog,
    label: t("header.user_menu.manage_account"),
  },
  {
    key: "change-password",
    icon: LucideKeyRound,
    label: t("header.user_menu.change_password"),
  },
  {
    key: "activity-log",
    icon: LucideRefreshCcw,
    label: t("header.user_menu.activity_log"),
  },
  {
    key: "logout",
    icon: LucideLogOut,
    label: t("header.user_menu.logout"),
  },
]);

const handleSelect: MenuProps["onClick"] = (data) => {
  const eventId = data.item.id;
  console.log(eventId);

  if (eventId === "logout") authStore.logout();
};
</script>

<style>
.custom-dropdown .ant-dropdown-menu {
  @apply p-0 !rounded-[14px];
}
</style>
