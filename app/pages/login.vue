<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-[#4880FF] relative overflow-hidden font-sans"
  >
    <!-- Декоративные волны -->
    <div
      class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white opacity-5 pointer-events-none"
    />
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white opacity-5 pointer-events-none"
    />

    <!-- Карточка Входа -->
    <div
      class="bg-white dark:bg-[#273142] rounded-[24px] p-10 md:p-12 text-center shadow-2xl max-w-[500px] w-[90%] mx-4 relative z-10 transition-colors duration-300"
    >
      <!-- Заголовки -->
      <h1
        class="text-2xl md:text-3xl font-bold text-[#202224] dark:text-white mb-2"
      >
        {{ t("auth.title") }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8 text-sm md:text-base">
        {{ t("auth.subtitle") }}
      </p>

      <!-- Форма -->
      <a-form
        :model="formState"
        layout="vertical"
        @finish="handleLogin"
        class="text-left"
      >
        <!-- Email -->
        <a-form-item
          :label="t('auth.email_label')"
          name="username"
          class="custom-label"
          :rules="[
            { required: true, message: t('validation.required') },
            // Для dummyjson логин - это username, а не email, но для вида оставим type email
            // { type: 'email', message: t('validation.email_invalid') }
          ]"
        >
          <a-input
            v-model:value="formState.username"
            :placeholder="t('auth.email_placeholder')"
            class="custom-auth-input"
            size="large"
          />
        </a-form-item>

        <!-- Password -->
        <a-form-item name="password" class="custom-label mb-4">
          <!-- Кастомный лейбл с ссылкой "Забыли пароль" -->
          <template #label>
            <div class="flex justify-between w-full items-center">
              <span>{{ t("auth.password_label") }}</span>
              <a
                href="#"
                class="text-sm text-gray-400 hover:text-[#4880FF] transition-colors"
              >
                {{ t("auth.forgot_password") }}
              </a>
            </div>
          </template>

          <a-input-password
            v-model:value="formState.password"
            placeholder="••••••••"
            class="custom-auth-input"
            size="large"
          />
        </a-form-item>

        <!-- Remember Me -->
        <a-form-item class="mb-8">
          <a-checkbox v-model:checked="formState.remember">
            <span class="text-gray-500 dark:text-gray-400">{{
              t("auth.remember_me")
            }}</span>
          </a-checkbox>
        </a-form-item>

        <!-- Submit Button -->
        <a-button
          type="primary"
          html-type="submit"
          block
          size="large"
          :loading="loading"
          class="h-12 rounded-[10px] text-base font-semibold bg-[#4880FF] hover:bg-[#3a6dcf] border-none shadow-lg shadow-blue-500/30"
        >
          {{ t("auth.sign_in") }}
        </a-button>

        <!-- Footer -->
        <div class="mt-6 text-center text-gray-500 dark:text-gray-400">
          {{ t("auth.no_account") }}
          <NuxtLink
            to="/register"
            class="text-[#4880FF] font-semibold hover:underline ml-1"
          >
            {{ t("auth.create_account") }}
          </NuxtLink>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { t } = useI18n();
const authStore = useAuthStore();
const loading = ref(false);

const formState = reactive({
  username: "",
  password: "",
  remember: false,
});

const handleLogin = async () => {
  loading.value = true;
  try {
    await authStore.login(formState.username, formState.password);
    message.success(t("messages.success_login") || "Welcome back!");
  } catch (error: any) {
    message.error(error.message || t("messages.error_operation"));
  } finally {
    loading.value = false;
  }
};
</script>

<style>
.custom-label .ant-form-item-label label[for="form_item_password"] {
  @apply w-full;
}
</style>
