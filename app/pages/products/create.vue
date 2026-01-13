<template>
  <div>
    <div class="mb-6">
      <h2
        class="text-[32px] font-bold text-[#202224] dark:text-white tracking-tight mb-6"
      >
        {{ $t("products.add_title") }}
      </h2>

      <CommonAppBreadcrumb
        :items="[
          { label: $t('products.value'), to: '/products' },
          { label: $t('products.add_title') },
        ]"
      />
    </div>

    <ProductForm />
  </div>
</template>
