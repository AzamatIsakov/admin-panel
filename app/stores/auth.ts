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

    // Логин
    async function login(username: string, password: string) {
      try {
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
          user.value = { ...userData, role: "admin" };

          return navigateTo("/");
        }
      } catch (err) {
        console.error("Login error:", err);
        throw err;
      }
    }

    // User me Получение текущего юзера
    async function fetchCurrentUser() {
      if (!token.value) return;

      try {
        const { data, error } = await useApi<User>("/auth/me");
        console.log(data.value);

        if (data.value) {
          Object.assign(user.value || {}, data.value);
        } else if (error.value) {
          if (error.value.statusCode === 401) {
            // logout();
          }
        }
      } catch (e) {
        console.error("Failed to fetch current user", e);
      }
    }

    // Refresh token
    async function refreshUserToken() {
      // Если нет рефреш токена, мы ничего не можем сделать -> выход
      if (!refreshToken.value) {
        logout();
        return false;
      }

      try {
        const data = await $fetch<any>("https://dummyjson.com/auth/refresh", {
          method: "POST",
          body: {
            refreshToken: refreshToken.value,
            expiresInMins: 60,
          },
        });

        token.value = data.accessToken;
        refreshToken.value = data.refreshToken;

        console.log("Token refreshed successfully");
        return true;
      } catch (error) {
        console.error("Refresh token expired or invalid", error);
        // Если не удалось обновить токен — значит сессия умерла окончательно
        logout();
        return false;
      }
    }

    // Логаут
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
      fetchCurrentUser,
      refreshUserToken,
      logout,
    };
  },
  {
    // Настройка Persist (сохранение)
    persist: {
      // Сохраняем только нужные поля
      pick: ["token", "refreshToken", "user"],
    },
  }
);
