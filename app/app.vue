<script setup>
// Благодаря auto-imports нам не нужно импортировать useThemeStore вручную
const themeStore = useThemeStore();

useHead({
  htmlAttrs: {
    class: () => (themeStore.isDark ? "dark" : "light"),
  },
});
</script>

<template>
  <div
    class="p-10 flex flex-col items-start gap-4 transition-colors duration-300 dark:bg-gray-900 dark:text-white bg-white text-black"
  >
    <h1 class="text-2xl font-bold">Проверка Pinia + Persist</h1>

    <p>Текущая тема: {{ themeStore.isDark ? "Темная 🌙" : "Светлая ☀️" }}</p>

    <!-- Кнопка Ant Design -->
    <a-button type="primary" @click="themeStore.toggleTheme">
      Переключить тему
    </a-button>

    <div class="mt-4 p-4 border rounded">
      Попробуй переключить тему на Темную, а затем <b>обнови страницу (F5)</b>.
      <br />Если тема останется темной — мы выполнили требование по Persist.
    </div>
  </div>
</template>
