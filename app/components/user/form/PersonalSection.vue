<template>
  <div
    class="bg-white dark:bg-dark-primary p-6 rounded-[14px] border border-gray-100 dark:border-gray-700"
  >
    <h3 class="text-lg font-bold mb-5 text-[#202224] dark:text-white">
      {{ t("users.sections.personal") }}
    </h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- FirstName (Мин 3 символа) -->
      <a-form-item
        :label="t('users.fields.first_name')"
        name="firstName"
        :rules="[rules.required(), rules.min(3)]"
      >
        <a-input v-model:value="formState.firstName" size="large" />
      </a-form-item>

      <!-- LastName (Мин 3 символа) -->
      <a-form-item
        :label="t('users.fields.last_name')"
        name="lastName"
        :rules="[rules.required(), rules.min(3)]"
      >
        <a-input v-model:value="formState.lastName" size="large" />
      </a-form-item>

      <!-- Email -->
      <a-form-item
        :label="t('users.fields.email')"
        name="email"
        :rules="[rules.required(), rules.email()]"
      >
        <a-input v-model:value="formState.email" size="large" />
      </a-form-item>

      <!-- Phone -->
      <a-form-item :label="t('users.fields.phone')" name="phone">
        <PhoneInput v-model:value="formState.phone" />
      </a-form-item>

      <a-form-item
        :label="t('users.fields.age')"
        name="age"
        :rules="[
          {
            type: 'number',
            min: 18,
            message: t('validation.number_min', { min: 18 }),
          },
        ]"
      >
        <a-input-number
          v-model:value="formState.age"
          size="large"
          class="!w-full"
          :min="18"
        />
      </a-form-item>

      <a-form-item :label="t('users.fields.gender')" name="gender">
        <a-select v-model:value="formState.gender" size="large">
          <a-select-option value="male">{{
            t("users.filters.genders.male")
          }}</a-select-option>
          <a-select-option value="female">{{
            t("users.filters.genders.female")
          }}</a-select-option>
        </a-select>
      </a-form-item>

      <!-- BirthDate: Используем value-format, чтобы в стейт падала строка "YYYY-MM-DD" -->
      <a-form-item :label="t('users.fields.birth_date')" name="birthDate">
        <a-date-picker
          v-model:value="formState.birthDate"
          value-format="YYYY-MM-DD"
          class="!w-full"
          size="large"
          :placeholder="t('users.placeholders.select_date')"
        />
      </a-form-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserFormState } from "~/types/user-form";
import PhoneInput from "~/components/common/PhoneInput.vue";
import { useFormRules } from "~/composables/useFormRules";

interface Props {
  formState: UserFormState;
}
defineProps<Props>();

const { t } = useI18n();
const rules = useFormRules();
</script>
