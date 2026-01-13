<template>
  <a-layout
    class="min-h-screen transition-colors duration-300 bg-[#F5F6FA] dark:bg-[#1B2431]"
  >
    <LayoutSidebar
      v-if="uiStore.isDesktop"
      :collapsed="collapsed"
      @toggle-sidebar="toggleSidebar"
    />

    <!-- Mobile Drawer -->
    <a-drawer
      v-if="uiStore.isMobile"
      placement="left"
      :open="mobileOpen"
      :closable="false"
      width="280"
      class="custom-drawer dark:bg-dark-primary"
      @close="mobileOpen = false"
    >
      <LayoutSidebarContent
        :collapsed="false"
        :is-mobile="true"
        @close="mobileOpen = false"
      />
    </a-drawer>

    <a-layout class="!bg-transparent">
      <LayoutHeader
        :collapsed="collapsed"
        @toggle-sidebar="toggleSidebar"
        @open-mobile-menu="mobileOpen = true"
      />

      <a-layout-content class="p-4 md:p-6 overflow-x-hidden">
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
const uiStore = useUiStore();

const collapsed = ref(false);
const mobileOpen = ref(false);

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

watch(
  () => uiStore.isMobile,
  (isMob) => {
    if (!isMob) mobileOpen.value = false;
  }
);
</script>

<style>
.custom-drawer .ant-drawer-body {
  @apply p-0;
}
</style>
