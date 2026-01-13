<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("users.sections.address") }}
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a-form-item
        :label="t('users.fields.street')"
        :name="['address', 'address']"
        class="md:col-span-2"
      >
        <a-input v-model:value="formState.address.address" size="large" />
      </a-form-item>

      <a-form-item :label="t('users.fields.city')" :name="['address', 'city']">
        <a-input v-model:value="formState.address.city" size="large" />
      </a-form-item>

      <a-form-item
        :label="t('users.fields.state')"
        :name="['address', 'state']"
      >
        <a-input v-model:value="formState.address.state" size="large" />
      </a-form-item>

      <a-form-item
        :label="t('users.fields.zip')"
        :name="['address', 'postalCode']"
      >
        <a-input v-model:value="formState.address.postalCode" size="large" />
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
