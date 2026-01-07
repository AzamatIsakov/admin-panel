<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <div style="padding: 50px">
    <h1>Проверка Ant Design Module</h1>
    <!-- Используем компоненты напрямую, без import -->
    <a-space>
      <a-button type="primary">Primary Button</a-button>
      <a-button>Default Button</a-button>
      <a-tag color="success">Success Tag</a-tag>
    </a-space>
  </div>
</template>
