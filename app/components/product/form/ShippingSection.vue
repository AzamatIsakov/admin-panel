<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700 transition-colors"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("products.sections.shipping") }}
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <!-- Weight -->
      <a-form-item
        :label="t('products.fields.weight')"
        name="weight"
        :rules="[
          {
            type: 'number',
            min: 0,
            message: t('validation.number_min', { min: 0 }),
          },
        ]"
      >
        <a-input-number
          v-model:value="formState.weight"
          class="!w-full"
          placeholder="kg"
          :min="0"
        />
      </a-form-item>

      <!-- Width -->
      <a-form-item
        :label="t('products.fields.width')"
        :name="['dimensions', 'width']"
        :rules="[
          {
            type: 'number',
            min: 0,
            message: t('validation.number_min', { min: 0 }),
          },
        ]"
      >
        <a-input-number
          v-model:value="formState.dimensions.width"
          class="!w-full"
          placeholder="W"
          :min="0"
        />
      </a-form-item>

      <!-- Height -->
      <a-form-item
        :label="t('products.fields.height')"
        :name="['dimensions', 'height']"
        :rules="[
          {
            type: 'number',
            min: 0,
            message: t('validation.number_min', { min: 0 }),
          },
        ]"
      >
        <a-input-number
          v-model:value="formState.dimensions.height"
          class="!w-full"
          placeholder="H"
          :min="0"
        />
      </a-form-item>

      <!-- Depth -->
      <a-form-item
        :label="t('products.fields.depth')"
        :name="['dimensions', 'depth']"
        :rules="[
          {
            type: 'number',
            min: 0,
            message: t('validation.number_min', { min: 0 }),
          },
        ]"
      >
        <a-input-number
          v-model:value="formState.dimensions.depth"
          class="!w-full"
          placeholder="D"
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
