<template>
  <div>
    <!-- Заголовок -->
    <div class="mb-6">
      <h2
        class="text-[32px] font-bold text-[#202224] dark:text-white tracking-tight mb-6"
      >
        {{ t("users.edit_title") }}
      </h2>

      <CommonAppBreadcrumb
        :items="[
          { label: t('users.title'), to: '/users' },
          { label: t('users.edit_title') },
        ]"
      />
    </div>

    <UserForm :user-id="route.params.id" />
  </div>
</template>
<script setup>
const route = useRoute();
const { t } = useI18n();
</script>
