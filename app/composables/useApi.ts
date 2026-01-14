import type { UseFetchOptions } from "nuxt/app";
import { defu } from "defu";

export function useApi<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiBase,

    // ПЕРЕХВАТЧИК ЗАПРОСА
    onRequest({ options }) {
      if (authStore.token) {
        options.headers = options.headers || {};

        if (options.headers instanceof Headers) {
          options.headers.set("Authorization", `Bearer ${authStore.token}`);
        } else {
          const headers = options.headers as unknown as Record<string, string>;
          headers["Authorization"] = `Bearer ${authStore.token}`;
        }
      }

      // console.log(`[API Req]: ${options.method || "GET"} -> ${url}`);
    },

    async onResponseError({ response }) {
      if (response.status === 401) {
        const success = await authStore.refreshUserToken();

        if (success) {
          reloadNuxtApp();
        }
      }
    },
  };

  const params = defu(options, defaults);

  return useFetch(url, params as UseFetchOptions<T>);
}
