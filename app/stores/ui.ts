import { defineStore } from "pinia";

interface LayoutConfig {
  screen_width: number;
  screen_height: number;
  is_mobile: boolean;
}

export const useUiStore = defineStore("ui", () => {
  // Создаем реактивную связь с Cookie
  // Если куки нет, ставим дефолт (например, десктоп)
  const cookie = useCookie<LayoutConfig>("layout-config", {
    maxAge: 60 * 60 * 24 * 365, // Храним 1 год
    default: () => ({
      screen_width: 1440, // Дефолт для SSR (если первый заход)
      screen_height: 900,
      is_mobile: false,
    }),
  });

  // State инициализируем из значения куки (оно уже доступно на сервере!)
  const width = ref(cookie.value.screen_width);
  const height = ref(cookie.value.screen_height);

  // Computed свойства для удобства
  // Важно: логику isMobile лучше дублировать здесь, чтобы она была реактивной
  const isMobile = computed(() => width.value < 1024);
  const isDesktop = computed(() => width.value >= 1024);

  // Action для обновления размеров (вызывается только на клиенте)
  function updateDimensions() {
    if (import.meta.client) {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Обновляем стейт
      width.value = w;
      height.value = h;

      // Обновляем куку (чтобы при F5 сервер уже знал размеры)
      cookie.value = {
        screen_width: w,
        screen_height: h,
        is_mobile: w < 1024,
      };
    }
  }

  return {
    width,
    height,
    isMobile,
    isDesktop,
    updateDimensions,
  };
});
