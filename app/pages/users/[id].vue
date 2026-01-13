<template>
  <div>
    <div class="mb-6">
      <h2
        class="text-[32px] font-bold text-[#202224] dark:text-white tracking-tight"
      >
        {{ t("users.edit_title") }}
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
        <a-breadcrumb-item>Edit</a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <UserForm :user-id="route.params.id" />
  </div>
</template>
<script setup>
const route = useRoute();
const { t } = useI18n();
</script>
