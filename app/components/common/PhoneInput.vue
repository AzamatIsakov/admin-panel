<template>
  <a-input
    :value="formattedValue"
    @input="handleInput"
    placeholder="+998 90 123 45 67"
    size="large"
    :max-length="20"
  />
</template>

<script setup lang="ts">
interface Props {
  value: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["update:value"]);

// Отображаемое значение
const formattedValue = computed(() => props.value);

const handleInput = (e: Event) => {
  const input = e.target as HTMLInputElement;
  let rawValue = input.value;

  // Очищаем: оставляем только цифры и плюс в начале
  let cleanValue = rawValue.replace(/[^\d+]/g, "");

  // Авто-добавление плюса, если начали с 998
  if (cleanValue.startsWith("998")) {
    cleanValue = "+" + cleanValue;
  }

  // Проверяем, это Узбекистан? (+998...)
  if (cleanValue.startsWith("+998")) {
    // Убираем всё лишнее для форматирования
    const digits = cleanValue.substring(4); // берем всё после +998

    let formatted = "+998";

    if (digits.length > 0) formatted += " " + digits.substring(0, 2);
    if (digits.length > 2) formatted += " " + digits.substring(2, 5);
    if (digits.length > 5) formatted += " " + digits.substring(5, 7);
    if (digits.length > 7) formatted += " " + digits.substring(7, 9);

    emit("update:value", formatted);
  } else {
    // Если другая страна - просто возвращаем очищенное значение
    // Для свободы оставим rawValue
    emit("update:value", rawValue);
  }
};
</script>
