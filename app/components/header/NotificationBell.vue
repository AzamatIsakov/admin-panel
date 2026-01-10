<template>
  <a-badge count="6" :offset="[-2, 5]" class="cursor-pointer text-white">
    <BellOutlined
      class="text-xl transition-colors text-gray-600 dark:text-gray-300 hover:text-blue-500"
    />
  </a-badge>
</template>

<script setup lang="ts">
import { BellOutlined } from "@ant-design/icons-vue";
</script>
