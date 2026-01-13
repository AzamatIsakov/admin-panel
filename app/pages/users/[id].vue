<template>
  <div>
    <h2 class="text-[32px] font-bold text-[#202224] dark:text-white mb-6">
      Edit User
    </h2>
    <UserForm :user-id="route.params.id" />
  </div>
</template>
<script setup>
const route = useRoute();
</script>
