<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700 transition-colors"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("products.sections.media") }}
    </h3>

    <!-- Thumbnail -->
    <a-form-item
      :label="t('products.fields.thumbnail')"
      name="thumbnail"
      :rules="[rules.required(), rules.url()]"
    >
      <a-input
        v-model:value="formState.thumbnail"
        placeholder="https://..."
        size="large"
      >
        <template #prefix><LinkOutlined class="text-gray-400" /></template>
      </a-input>
      <div
        v-if="formState.thumbnail"
        class="mt-4 w-32 h-32 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden bg-gray-50 dark:bg-gray-800"
      >
        <img :src="formState.thumbnail" class="w-full h-full object-cover" />
      </div>
    </a-form-item>

    <!-- Images List -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Image 1 -->
      <a-form-item
        :label="`${t('products.fields.images')} (1)`"
        :name="['images', 0]"
        :rules="[rules.url()]"
      >
        <a-input
          v-model:value="formState.images[0]"
          placeholder="https://..."
          :rules="[rules.url()]"
        />
      </a-form-item>

      <!-- Image 2 -->
      <a-form-item
        :label="`${t('products.fields.images')} (2)`"
        :name="['images', 1]"
        :rules="[rules.url()]"
      >
        <a-input
          v-model:value="formState.images[1]"
          placeholder="https://..."
        />
      </a-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LinkOutlined } from "@ant-design/icons-vue";
import type { ProductFormState } from "~/types/form";

interface Props {
  formState: ProductFormState;
}
defineProps<Props>();
const { t } = useI18n();
const rules = useFormRules();
</script>
