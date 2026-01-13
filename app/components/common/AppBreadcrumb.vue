<template>
  <a-breadcrumb class="dark:text-gray-400">
    <a-breadcrumb-item>
      <NuxtLink to="/">
        <HomeOutlined />
      </NuxtLink>
    </a-breadcrumb-item>

    <a-breadcrumb-item v-for="(item, index) in items" :key="index">
      <NuxtLink v-if="item.to" :to="item.to">
        {{ item.label }}
      </NuxtLink>
      <span v-else>{{ item.label }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { HomeOutlined } from "@ant-design/icons-vue";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

defineProps<{
  items: BreadcrumbItem[];
}>();
</script>
