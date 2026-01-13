export const useThemeStore = defineStore(
  "theme",
  () => {
    // State
    const isDark = ref(false);

    // Actions
    function toggleTheme() {
      isDark.value = !isDark.value;
    }

    // Возвращаем всё наружу
    return {
      isDark,
      toggleTheme,
    };
  },
  {
    // Теперь при перезагрузке страницы тема не сбросится
    persist: true,
  }
);
