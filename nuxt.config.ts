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
    "@nuxtjs/i18n",
    "nuxt-lucide-icons",
  ],

  // Настройки i18n
  i18n: {
    langDir: "", // Папка с переводами
    defaultLocale: "en",
    strategy: "no_prefix",
    locales: [
      { code: "en", file: "en.json", name: "English", iso: "en-US" },
      { code: "ru", file: "ru.json", name: "Русский", iso: "ru-RU" },
      { code: "uz", file: "uz.json", name: "O'zbekcha", iso: "uz-UZ" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  lucide: {
    namePrefix: "Lucide",
  },

  css: ["~/assets/css/main.css"],

  googleFonts: {
    families: {
      "Nunito+Sans": [300, 400, 600, 700, 800],
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
