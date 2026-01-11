<template>
  <a-config-provider
    :theme="{
      algorithm: themeStore.isDark ? darkAlgorithm : defaultAlgorithm,
      token: {
        fontFamily: 'Nunito Sans, sans-serif',
        colorPrimary: '#4880FF',
        colorBgBase: themeStore.isDark ? '#273142' : '#ffffff',
        colorTextBase: themeStore.isDark ? '#ffffff' : '#202224',
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

useScreenListener();

const { defaultAlgorithm, darkAlgorithm } = theme;
const themeStore = useThemeStore();

useHead({
  htmlAttrs: {
    class: () => (themeStore.isDark ? "dark" : ""),
  },
});
</script>
