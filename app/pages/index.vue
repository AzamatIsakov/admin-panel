<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>

    <div v-if="authStore.user">
      <p class="text-lg">
        Привет,
        <span class="font-bold text-blue-600">{{
          authStore.user.firstName
        }}</span
        >!
      </p>

      <a-card class="mt-4 w-64">
        <template #cover>
          <img :src="authStore.user.image" alt="avatar" />
        </template>
        <a-card-meta :title="authStore.user.username">
          <template #description>{{ authStore.user.email }}</template>
        </a-card-meta>
      </a-card>

      <a-button danger class="mt-5" @click="authStore.logout"> Выйти </a-button>
    </div>

    <div v-else>
      <p>Вы не авторизованы.</p>
      <NuxtLink to="/login">
        <a-button type="primary">Войти</a-button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
</script>
