<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700 transition-colors"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("products.sections.organization") }}
    </h3>

    <!-- Динамические Категории -->
    <a-form-item
      :label="t('products.fields.category')"
      name="category"
      :rules="[{ required: true, message: t('validation.select_required') }]"
    >
      <a-select
        v-model:value="formState.category"
        :placeholder="t('products.placeholders.select_category')"
        size="large"
        :options="categories"
        :loading="loading"
        show-search
        option-filter-prop="label"
      />
    </a-form-item>

    <a-form-item :label="t('products.fields.brand')" name="brand">
      <a-input v-model:value="formState.brand" size="large" />
    </a-form-item>

    <a-form-item :label="t('products.fields.tags')" name="tags">
      <a-select
        v-model:value="formState.tags"
        mode="tags"
        size="large"
        :placeholder="t('products.placeholders.enter_tag')"
        :token-separators="[',']"
        :options="tagsOptions"
      />
    </a-form-item>
  </div>
</template>

<script setup lang="ts">
import type { ProductFormState } from "~/types/form";

interface Props {
  formState: ProductFormState;
}

const props = defineProps<Props>();

const { t } = useI18n();

const { categories, loading, fetchCategories } = useCategories();

const tagsOptions = computed(() => {
  return props.formState.tags.map((tag) => ({ value: tag, label: tag }));
});

fetchCategories();
</script>
