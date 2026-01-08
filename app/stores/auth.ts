import { defineStore } from "pinia";
import type { LoginResponse, User } from "~/types/auth";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // --- States ---
    const user = ref<User | null>(null);
    const token = ref<string | null>(null);
    const refreshToken = ref<string | null>(null);
    const isAuthenticated = computed(() => !!token.value);

    // --- Actions ---

    // 1. Логин
    async function login(username: string, password: string) {
      try {
        // Используем наш useApi. Обрати внимание на POST метод.
        const { data, error } = await useApi<LoginResponse>("/auth/login", {
          method: "POST",
          body: { username, password },
        });

        if (error.value) {
          throw new Error(error.value.message || "Ошибка входа");
        }

        if (data.value) {
          // Сохраняем данные в стейт
          token.value = data.value.accessToken;
          refreshToken.value = data.value.refreshToken;

          // Отделяем данные пользователя от токенов для чистоты
          const {
            accessToken: _t,
            refreshToken: _rt,
            ...userData
          } = data.value;
          user.value = userData;

          // Редирект на главную (Dashboard) после успешного входа
          // Используем navigateTo (нативный метод Nuxt)
          return navigateTo("/");
        }
      } catch (err) {
        console.error("Login error:", err);
        throw err; // Пробрасываем ошибку, чтобы показать её в UI компоненте
      }
    }

    // 2. Логаут
    function logout() {
      token.value = null;
      refreshToken.value = null;
      user.value = null;
      navigateTo("/login");
    }

    return {
      user,
      token,
      refreshToken,
      isAuthenticated,
      login,
      logout,
    };
  },
  {
    // Настройка Persist (сохранение в localStorage)
    persist: {
      // Сохраняем только нужные поля
      pick: ["token", "refreshToken", "user"],
    },
  }
);
