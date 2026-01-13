<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700 transition-colors"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("products.sections.general") }}
    </h3>

    <!-- Title -->
    <a-form-item
      :label="t('products.fields.title')"
      name="title"
      :rules="[{ required: true, message: t('validation.required') }]"
    >
      <a-input
        v-model:value="formState.title"
        :placeholder="t('products.placeholders.title')"
        size="large"
      />
    </a-form-item>

    <!-- Description -->
    <a-form-item
      :label="t('products.fields.description')"
      name="description"
      :rules="[{ required: true, message: t('validation.required') }]"
    >
      <a-textarea
        v-model:value="formState.description"
        :placeholder="t('products.placeholders.description')"
        :rows="5"
        class="!resize-none"
      />
    </a-form-item>

    <!-- Warranty Information -->
    <a-form-item
      :label="t('products.fields.warranty')"
      name="warrantyInformation"
    >
      <a-input
        v-model:value="formState.warrantyInformation"
        :placeholder="t('products.placeholders.warranty')"
        size="large"
      />
    </a-form-item>
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
