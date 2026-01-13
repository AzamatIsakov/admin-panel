<template>
  <div>
    <h2 class="text-[32px] font-bold text-[#202224] dark:text-white mb-6">
      {{ t("users.add_user") }}
    </h2>
    <UserForm />
  </div>
</template>
<script setup>
const { t } = useI18n();
</script>
