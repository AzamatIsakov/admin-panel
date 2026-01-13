<template>
  <a-dropdown
    class="w-[152px]"
    trigger="click"
    placement="bottom"
    overlay-class-name="custom-dropdown"
  >
    <div
      class="flex items-center gap-4 cursor-pointer text-[#646464] dark:text-white transition-colors h-[27px]"
    >
      <NuxtImg
        :src="selectedLanguage.image"
        :alt="selectedLanguage.key"
        class="h-[27px] aspect-[3/2] rounded-[5px]"
      />
      <span class="flex items-center gap-2 text-sm leading-none font-semibold">
        {{ selectedLanguage.label }}
        <LucideChevronDown class="size-5 text-gray-400" />
      </span>
    </div>

    <template #overlay>
      <a-menu class="w-[254px]" @click="handleLangSelect">
        <a-menu-item
          disabled
          class="!px-5 !pt-3.5 !pb-3 !cursor-default !text-black dark:!text-white text-sm font-normal !leading-none !bg-transparent"
        >
          {{ $t("header.select_language") }}
        </a-menu-item>

        <a-menu-divider class="!my-0" />

        <a-menu-item
          v-for="language in languageItems"
          :key="language.key"
          class="!px-4 !py-[15px] text-sm leading-none font-semibold !rounded-none"
        >
          <div class="flex items-center gap-2">
            <NuxtImg :src="language.image" class="h-[30px] aspect-[3/2]" />
            {{ language.label }}
            <LucideCheck v-if="language.key === locale" class="ml-auto" />
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import type { MenuProps } from "ant-design-vue";

const { locale, setLocale } = useI18n();

const selectedLanguage = computed(
  () => languageItems.find((languageItem) => languageItem.key === locale.value)!
);

const languageItems = [
  {
    key: "en",
    label: "English",
    image: "/icons/uk-flag.webp",
  },
  {
    key: "uz",
    label: "O'zbekcha",
    image: "/icons/uz-flag.webp",
  },
  {
    key: "ru",
    label: "Русский",
    image: "/icons/ru-flag.webp",
  },
];

const handleLangSelect: MenuProps["onClick"] = ({ key }) => {
  const newLocale = key as "en" | "ru" | "uz";
  setLocale(newLocale);
};
</script>

<style>
.custom-dropdown .ant-dropdown-menu {
  @apply p-0 rounded-xl overflow-hidden dark:bg-dark-primary;
}
</style>
