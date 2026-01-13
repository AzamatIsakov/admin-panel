<template>
  <div>
    <div class="mb-6">
      <h2
        class="text-[32px] font-bold text-[#202224] dark:text-white tracking-tight"
      >
        {{ $t("products.edit_title") }}
      </h2>
      <!-- Хлебные крошки -->
      <a-breadcrumb class="dark:text-gray-400">
        <a-breadcrumb-item>
          <NuxtLink to="/products">{{ $t("products.value") }}</NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t("products.edit_title") }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- Тот же компонент, но передадим ID -->
    <ProductForm :product-id="route.params.id" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
