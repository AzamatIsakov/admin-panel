export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@ant-design-vue/nuxt",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  antd: {
    // Options
    extractStyle: true,
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },
});
