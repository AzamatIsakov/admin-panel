<template>
  <a-dropdown
    class="dropdown"
    trigger="click"
    placement="bottom"
    overlay-class-name="custom-dropdown"
  >
    <div
      class="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-200 hover:text-blue-500 transition-colors"
    >
      <NuxtImg
        src="https://flagcdn.com/w20/gb.png"
        alt="en"
        class="rounded-sm w-5 h-auto shadow-sm"
      />
      <span class="hidden sm:block font-medium">English</span>
      <DownOutlined class="text-xs text-gray-400" />
    </div>

    <template #overlay>
      <a-menu class="w-[254px]" @click="onSelect">
        <a-menu-item
          disabled
          class="!px-5 !pt-3.5 !pb-3 !cursor-default !text-black dark:!text-white text-sm font-normal !leading-none"
        >
          Выберите вариант
        </a-menu-item>

        <a-menu-divider class="!my-0" />

        <a-menu-item
          v-for="language in languageItems"
          :key="language.key"
          class="!px-4 !py-[15px] text-sm leading-none font-semibold"
        >
          <div class="flex items-center gap-2">
            <NuxtImg :src="language.image" class="h-[30px] aspect-[3/2]" />
            {{ language.label }}
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import { DownOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";

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

const onSelect: MenuProps["onClick"] = ({ key }) => {
  console.log(key);
};
</script>

<style>
.custom-dropdown .ant-dropdown-menu {
  @apply p-0 rounded-xl overflow-hidden;
}
</style>
