import type { UseFetchOptions } from "nuxt/app";
import { defu } from "defu";

export function useApi<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const config = useRuntimeConfig();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBase,

    // ПЕРЕХВАТЧИК ЗАПРОСА
    onRequest({ options }) {
      const authStore = useAuthStore();

      if (authStore.token) {
        // Гарантируем, что headers существуют
        options.headers = options.headers || {};

        // Проверяем, является ли это экземпляром класса Headers (безопасный подход)
        if (options.headers instanceof Headers) {
          options.headers.set("Authorization", `Bearer ${authStore.token}`);
        } else {
          // Если это обычный объект, используем приведение типов
          // TS требует сначала привести к unknown, чтобы "забыть" старый тип,
          // а потом к Record, чтобы разрешить запись по ключу.
          const headers = options.headers as unknown as Record<string, string>;
          headers["Authorization"] = `Bearer ${authStore.token}`;
        }
      }

      console.log(`[API Req]: ${options.method || "GET"} -> ${url}`);
    },

    onResponseError({ response }) {
      // Если пришла ошибка 401 (Unauthorized), значит токен протух
      if (response.status === 401) {
        const authStore = useAuthStore();
        authStore.logout(); // Выкидываем пользователя
      }
    },
  };

  const params = defu(options, defaults);

  return useFetch(url, params as UseFetchOptions<T>);
}
