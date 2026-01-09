<template>
  <!-- Tailwind сам переключит цвет, когда на <html> появится класс dark -->
  <a-layout
    class="min-h-screen transition-colors duration-300 bg-[#F5F6FA] dark:bg-dark-bg"
  >
    <LayoutSidebar :collapsed="collapsed" @toggle-sidebar="toggleSidebar" />

    <a-layout class="!bg-transparent">
      <LayoutHeader :collapsed @toggle-sidebar="toggleSidebar" />

      <a-layout-content class="p-6 overflow-x-hidden">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
const collapsed = ref(false);

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};
</script>
