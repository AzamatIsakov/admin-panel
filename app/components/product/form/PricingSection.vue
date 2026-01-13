<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700 transition-colors"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("products.sections.pricing") }}
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Price -->
      <a-form-item
        :label="t('products.fields.price')"
        name="price"
        :rules="[
          { required: true, message: t('validation.required') },
          {
            type: 'number',
            min: 0,
            message: t('validation.number_min', { min: 0 }),
            trigger: 'change',
          },
        ]"
      >
        <a-input-number
          v-model:value="formState.price"
          class="!w-full"
          size="large"
          :min="0"
          prefix="$"
        />
      </a-form-item>

      <!-- Discount -->
      <a-form-item
        :label="t('products.fields.discount')"
        name="discountPercentage"
        :rules="[
          {
            type: 'number',
            min: 0,
            message: t('validation.number_min', { min: 0 }),
            trigger: 'change',
          },
          {
            type: 'number',
            max: 100,
            message: t('validation.number_max', { max: 100 }),
            trigger: 'change',
          },
        ]"
      >
        <a-input-number
          v-model:value="formState.discountPercentage"
          class="!w-full"
          size="large"
          :min="0"
          :max="100"
          prefix="%"
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
