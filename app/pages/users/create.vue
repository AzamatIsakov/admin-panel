<template>
  <div>
    <div class="mb-6">
      <h2
        class="text-[32px] font-bold text-[#202224] dark:text-white tracking-tight"
      >
        {{ t("users.add_user") }}
      </h2>
      <a-breadcrumb class="dark:text-gray-400">
        <a-breadcrumb-item
          ><NuxtLink to="/">Dashboard</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item
          ><NuxtLink to="/users">{{
            t("users.title")
          }}</NuxtLink></a-breadcrumb-item
        >
        <a-breadcrumb-item>{{ t("users.add_user") }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <UserForm />
  </div>
</template>
<script setup>
const { t } = useI18n();
</script>
