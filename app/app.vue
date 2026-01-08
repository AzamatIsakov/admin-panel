<template>
  <!-- Теперь используем переменные directly, без приставки theme. -->
  <a-config-provider
    :theme="{
      algorithm: themeStore.isDark ? darkAlgorithm : defaultAlgorithm,
      token: {
        fontFamily: 'Nunito Sans, sans-serif',
      },
    }"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from "ant-design-vue";

const { defaultAlgorithm, darkAlgorithm } = theme;
const themeStore = useThemeStore();

useHead({
  htmlAttrs: {
    class: () => (themeStore.isDark ? "dark" : ""),
  },
});
</script>
