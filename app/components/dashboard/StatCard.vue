<template>
  <div
    class="min-w-[262px] bg-white dark:bg-dark-primary p-4 rounded-[14px] shadow-sm transition-colors duration-300"
  >
    <div class="flex flex-col gap-[30px] justify-between items-start h-full">
      <div class="flex gap-4 justify-between w-full">
        <div>
          <p
            class="text-[#202224] dark:text-gray-400 text-base font-semibold mb-4"
          >
            {{ title }}
          </p>
          <h3
            class="text-[28px] font-bold text-[#202224] dark:text-white leading-none tracking-[1px]"
          >
            {{ formattedValue }}
          </h3>
        </div>

        <!-- Иконка с цветным фоном (Справа сверху) -->
        <div
          class="size-[60px] rounded-3xl flex items-center justify-center text-3xl shrink-0 transition-colors"
          :class="iconStyles"
        >
          <slot name="icon" />
        </div>
      </div>

      <!-- Тренды -->
      <div class="flex items-center gap-2 text-sm font-medium">
        <!-- Иконка тренда + Процент -->
        <span
          class="flex items-center gap-1 text-base"
          :class="trend > 0 ? 'text-[#00B69B]' : 'text-[#F93C65]'"
        >
          <component
            :is="trend > 0 ? RiseOutlined : FallOutlined"
            class="text-xl"
          />
          <span class="text-base">{{ Math.abs(trend) }}%</span>
          <span class="text-[#606060] dark:text-gray-500 font-normal">
            <span>{{
              trend > 0
                ? $t("dashboard.stat_card.up_from_yesterday")
                : $t("dashboard.stat_card.down_from_yesterday")
            }}</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RiseOutlined, FallOutlined } from "@ant-design/icons-vue";

const props = defineProps<{
  title: string;
  value: number | string;
  trend: number;
  color: "blue" | "yellow" | "green" | "red" | string;
}>();

// Форматируем число (например: 40,689)
const formattedValue = computed(() =>
  typeof props.value === "number" ? formatMoney(props.value) : props.value
);

// Стили для иконки в зависимости от цвета
const iconStyles = computed(() => {
  switch (props.color) {
    case "blue":
      return "bg-[#E5E4FF] text-[#4880FF] dark:bg-[#4880FF]/20 dark:text-[#4880FF]";
    case "yellow":
      return "bg-[#FFF3D6] text-[#FFB648] dark:bg-[#FFB648]/20 dark:text-[#FFB648]";
    case "green":
      return "bg-[#DCFCE7] text-[#00B69B] dark:bg-[#00B69B]/20 dark:text-[#00B69B]";
    case "red":
      return "bg-[#FFE2E5] text-[#F93C65] dark:bg-[#F93C65]/20 dark:text-[#F93C65]";
    default:
      return "bg-gray-100 text-gray-600";
  }
});
</script>
