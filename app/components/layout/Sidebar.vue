<template>
  <a-layout-sider
    width="240"
    collapsedWidth="85"
    :collapsed="collapsed"
    :trigger="null"
    collapsible
    class="!bg-white dark:!bg-dark-primary !transition-all !duration-300 shadow-sm z-20"
  >
    <LayoutSidebarContent
      :collapsed="collapsed"
      :is-mobile="false"
      @toggle-collapse="$emit('toggleSidebar')"
    />
  </a-layout-sider>
</template>

<script setup lang="ts">
interface Props {
  collapsed: boolean;
}

defineProps<Props>();
defineEmits(["toggleSidebar"]);
</script>
