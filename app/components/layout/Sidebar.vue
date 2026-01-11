<template>
  <a-layout-sider
    width="240"
    collapsedWidth="85"
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    class="!bg-white dark:!bg-dark-primary !transition-all !duration-300 shadow-sm z-20"
  >
    <!-- Переиспользуем контент, режим Desktop -->
    <LayoutSidebarContent
      :collapsed="collapsed"
      :is-mobile="false"
      @toggle-collapse="$emit('toggleSidebar')"
    />
  </a-layout-sider>
</template>

<script setup lang="ts">
defineProps<{ collapsed: boolean }>();
defineEmits(["toggleSidebar"]);
</script>
