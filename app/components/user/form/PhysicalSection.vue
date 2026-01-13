<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("users.sections.physical") }}
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <a-form-item :label="t('users.fields.height')" name="height">
        <a-input-number
          v-model:value="formState.height"
          size="large"
          class="!w-full"
          :min="0"
        />
      </a-form-item>

      <a-form-item :label="t('users.fields.weight')" name="weight">
        <a-input-number
          v-model:value="formState.weight"
          size="large"
          class="!w-full"
          :min="0"
        />
      </a-form-item>

      <a-form-item :label="t('users.fields.eye_color')" name="eyeColor">
        <a-select v-model:value="formState.eyeColor" size="large">
          <a-select-option value="Green">Green</a-select-option>
          <a-select-option value="Blue">Blue</a-select-option>
          <a-select-option value="Brown">Brown</a-select-option>
          <a-select-option value="Amber">Amber</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item :label="t('users.fields.blood_group')" name="bloodGroup">
        <a-select v-model:value="formState.bloodGroup" size="large">
          <a-select-option value="A+">A+</a-select-option>
          <a-select-option value="B+">B+</a-select-option>
          <a-select-option value="O+">O+</a-select-option>
          <a-select-option value="AB+">AB+</a-select-option>
        </a-select>
      </a-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserFormState } from "~/types/user-form";
interface Props {
  formState: UserFormState;
}
defineProps<Props>();
const { t } = useI18n();
</script>
