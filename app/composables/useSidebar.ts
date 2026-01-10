import { h, reactive, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { ItemType, MenuProps } from "ant-design-vue";

import {
  LucideCircleGauge,
  LucideGrid2x2,
  LucideUsersRound,
} from "lucide-vue-next";

export const useSidebar = () => {
  const { t } = useI18n();
  const router = useRouter();
  const route = useRoute();
  const authStore = useAuthStore();

  // Состояние активного ключа
  const state = reactive({ selectedKeys: ["dashboard"] });

  // Логика слежения за URL
  watch(
    () => route.path,
    (path) => {
      if (path === "/") state.selectedKeys = ["dashboard"];
      else if (path.startsWith("/products")) state.selectedKeys = ["products"];
      else if (path.startsWith("/users")) state.selectedKeys = ["users"];
    },
    { immediate: true }
  );

  // Меню стало Computed, чтобы реагировать на смену языка
  const menuItems = computed<ItemType[]>(() => [
    {
      key: "dashboard",
      icon: () => h(LucideCircleGauge),
      label: t("menu.dashboard"),
      title: t("menu.dashboard"),
    },
    {
      key: "products",
      icon: () => h(LucideGrid2x2),
      label: t("menu.products"),
      title: t("menu.products"),
    },
    {
      key: "users",
      icon: () => h(LucideUsersRound),
      label: t("menu.users"),
      title: t("menu.users"),
    },
  ]);

  // Обработчик клика
  const handleMenuClick: MenuProps["onClick"] = (info) => {
    const key = info.key as string;
    if (key === "dashboard") router.push("/");
    else if (key === "products") router.push("/products");
    else if (key === "users") router.push("/users");
  };

  const handleLogout = () => authStore.logout();

  return {
    state,
    menuItems,
    handleMenuClick,
    handleLogout,
  };
};
