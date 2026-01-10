<template>
  <a-switch
    :checked="themeStore.isDark"
    checked-children="🌙"
    un-checked-children="☀️"
    @change="themeStore.toggleTheme"
  />
</template>

<script setup lang="ts">
const themeStore = useThemeStore();
</script>
