<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700 transition-colors"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("products.sections.inventory") }}
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a-form-item :label="t('products.fields.sku')" name="sku">
        <a-input
          v-model:value="formState.sku"
          placeholder="FOX-2391"
          size="large"
        />
      </a-form-item>

      <a-form-item
        :label="t('products.fields.stock')"
        name="stock"
        :rules="[{ required: true, message: t('validation.required') }]"
      >
        <a-input-number
          v-model:value="formState.stock"
          class="!w-full"
          size="large"
          :min="0"
        />
      </a-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductFormState } from "~/types/form";

interface Props {
  formState: ProductFormState;
}

defineProps<Props>();
const { t } = useI18n();
</script>
