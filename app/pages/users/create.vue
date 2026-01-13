<template>
  <div>
    <div class="mb-6">
      <h2
        class="text-[32px] font-bold text-[#202224] dark:text-white tracking-tight mb-6"
      >
        {{ t("users.add_user") }}
      </h2>

      <CommonAppBreadcrumb
        :items="[
          { label: t('users.title'), to: '/users' },
          { label: t('users.add_user') },
        ]"
      />
    </div>

    <UserForm />
  </div>
</template>
<script setup>
const { t } = useI18n();
</script>
