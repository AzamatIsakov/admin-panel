<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-[#4880FF] relative overflow-hidden font-sans"
  >
    <!-- Декоративные круги на фоне (имитация волн) -->
    <div
      class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-white opacity-5"
    />
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-white opacity-5"
    />

    <!-- Белая карточка -->
    <div
      class="bg-white dark:bg-dark-primary rounded-2xl xl:rounded-[30px] p-5 xl:px-[120px] xl:py-[102px] text-center shadow-2xl md:max-w-xl xl:max-w-[630px] w-full mx-4 relative z-10"
    >
      <!-- Иллюстрация 404 (CSS Art) -->
      <div class="mb-8 flex justify-center">
        <!-- Имитация окошка браузера как на скрине -->
        <div
          class="w-full h-[298px] bg-[#EBF5FF] dark:bg-slate-800 rounded-lg relative overflow-hidden flex flex-col items-center justify-center"
        >
          <!-- Верхняя панель -->
          <div class="absolute top-4 left-4 flex gap-1.5">
            <div class="w-2.5 h-2.5 rounded-full bg-[#F93C65]" />
            <div class="w-2.5 h-2.5 rounded-full bg-[#FFB648]" />
            <div class="w-2.5 h-2.5 rounded-full bg-[#00B69B]" />
          </div>

          <!-- Синий блок внутри -->
          <div
            class="relative flex items-center justify-center w-[85%] h-[75%] mt-6 bg-[#4880FF] rounded-md"
          >
            <h1
              class="text-8xl xl:text-9xl font-black text-[#FFB648] tracking-widest drop-shadow-md"
            >
              {{ props.error.statusCode }}
            </h1>

            <!-- Полоски интерфейса (внизу) -->
            <div
              class="absolute bottom-4 left-4 w-8 h-1.5 bg-white/30 rounded-full"
            />
            <div class="absolute bottom-4 right-4 flex gap-1">
              <div class="w-1.5 h-1.5 bg-white/30 rounded-full" />
              <div class="w-1.5 h-1.5 bg-white/30 rounded-full" />
              <div class="w-1.5 h-1.5 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <!-- Текст -->
      <h2 class="text-2xl font-bold text-[#202224] dark:text-white mb-8">
        {{ t("error.not_found") }}
      </h2>

      <!-- Кнопка -->
      <a-button
        type="primary"
        size="large"
        class="py-[15px] w-full rounded-xl text-lg text-white font-semibold bg-[#4880FF] hover:bg-[#3a6dcf] border-none shadow-lg shadow-blue-500/30 transition-all duration-300"
        @click="handleError"
      >
        {{ t("error.back_home") }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

// Важно: error.vue получает проп error
const props = defineProps(["error"]);

const handleError = () => {
  // clearError очищает состояние ошибки Nuxt и редиректит
  clearError({ redirect: "/" });
};
</script>

<style scoped>
/* Глобальный сброс фона для страницы ошибки, чтобы перебить дефолтный layout */
:global(body) {
  margin: 0;
  padding: 0;
}
</style>
