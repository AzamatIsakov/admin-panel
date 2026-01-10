<template>
  <a-badge
    count="4"
    :offset="[-2, 5]"
    class="custom-badge cursor-pointer text-white mr-2.5"
  >
    <NuxtImg
      v-if="themeStore.isDark"
      class="size-6"
      src="/icons/bell-icon-dark.svg"
    />
    <NuxtImg v-else class="size-6" src="/icons/bell-icon-light.svg" />
  </a-badge>
</template>

<script setup lang="ts">
const themeStore = useThemeStore();
</script>

<style>
.custom-badge .ant-scroll-number {
  @apply h-[18px] border-red-300 text-white text-xs;
}

.custom-badge .ant-scroll-number * {
  @apply !h-[18px];
}
</style>
