export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@ant-design-vue/nuxt",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
  ],

  css: ["~/assets/css/main.css"],

  googleFonts: {
    families: {
      "Nunito+Sans": [300, 400, 600, 700, 800], // Веса из твоего списка
    },
    display: "swap",
  },

  antd: {
    // Options
    extractStyle: true,
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  runtimeConfig: {
    public: {
      apiBase: "https://dummyjson.com",
    },
  },
});