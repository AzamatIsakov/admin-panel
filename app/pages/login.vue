<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <a-card
      class="w-full max-w-md shadow-lg"
      title="Вход в систему"
      :bordered="false"
    >
      <a-form
        :model="formState"
        name="login"
        layout="vertical"
        autocomplete="off"
        @finish="handleLogin"
      >
        <!-- Поле Username -->
        <a-form-item
          label="Имя пользователя"
          name="username"
          :rules="[{ required: true, message: 'Введите имя пользователя!' }]"
        >
          <a-input v-model:value="formState.username" placeholder="emilys">
            <template #prefix>
              <UserOutlined class="text-gray-400" />
            </template>
          </a-input>
        </a-form-item>

        <!-- Поле Password -->
        <a-form-item
          label="Пароль"
          name="password"
          :rules="[{ required: true, message: 'Введите пароль!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="emilyspass"
          >
            <template #prefix>
              <LockOutlined class="text-gray-400" />
            </template>
          </a-input-password>
        </a-form-item>

        <!-- Кнопка -->
        <a-form-item class="mb-0">
          <a-button
            type="primary"
            html-type="submit"
            block
            :loading="loading"
            size="large"
          >
            Войти
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";

definePageMeta({
  layout: false,
});

// Данные формы
const formState = reactive({
  username: "",
  password: "",
});

const loading = ref(false);
const authStore = useAuthStore();

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(formState.username, formState.password);
    message.success("Успешный вход!");
  } catch (error: any) {
    // message.error - это всплывающее уведомление Ant Design
    message.error(error.message || "Ошибка авторизации");
  } finally {
    loading.value = false;
  }
};
</script>
