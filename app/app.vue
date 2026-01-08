<script setup>
const themeStore = useThemeStore();

useHead({
  htmlAttrs: {
    class: () => (themeStore.isDark ? "dark" : "light"),
  },
});
</script>

<template>
  <a-config-provider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
</template>
