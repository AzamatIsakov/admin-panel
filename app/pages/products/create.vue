<template>
  <div>
    <div class="mb-6">
      <h2
        class="text-[32px] font-bold text-[#202224] dark:text-white tracking-tight"
      >
        {{ $t("products.add_title") }}
      </h2>
      <!-- Хлебные крошки -->
      <a-breadcrumb class="dark:text-gray-400">
        <a-breadcrumb-item>
          <NuxtLink to="/products">{{ $t("products.value") }}</NuxtLink>
        </a-breadcrumb-item>
        <a-breadcrumb-item>{{ $t("products.add_title") }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- Компонент формы (пока пустой, но мы его подключим) -->
    <ProductForm />
  </div>
</template>
