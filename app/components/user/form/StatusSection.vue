<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("users.sections.account") }}
    </h3>

    <!-- Role -->
    <a-form-item :label="t('users.fields.role')" name="role">
      <a-select v-model:value="formState.role" size="large">
        <a-select-option value="admin">{{
          t("users.filters.roles.admin")
        }}</a-select-option>
        <a-select-option value="moderator">{{
          t("users.filters.roles.moderator")
        }}</a-select-option>
        <a-select-option value="user">{{
          t("users.filters.roles.user")
        }}</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Username -->
    <a-form-item
      :label="t('users.fields.username')"
      name="username"
      :rules="[{ required: true, message: t('validation.required') }]"
    >
      <a-input v-model:value="formState.username" size="large" />
    </a-form-item>

    <!-- Avatar URL -->
    <a-form-item :label="t('users.fields.image_url')" name="image">
      <a-input
        v-model:value="formState.image"
        placeholder="https://..."
        size="large"
      />
      <!-- Preview -->
      <div
        v-if="formState.image"
        class="mt-4 w-24 h-24 rounded-full border border-gray-200 dark:border-gray-600 overflow-hidden bg-gray-50 mx-auto"
      >
        <img :src="formState.image" class="w-full h-full object-cover" />
      </div>
    </a-form-item>
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
