<template>
  <a-form
    layout="vertical"
    :model="formState"
    @finish="handleSubmit"
    class="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-20"
  >
    <!-- ЛЕВАЯ КОЛОНКА -->
    <div class="xl:col-span-2 flex flex-col gap-6">
      <UserFormPersonalSection :form-state="formState" />
      <UserFormAddressSection :form-state="formState" />
      <UserFormPhysicalSection :form-state="formState" />
      <UserFormProfessionalSection :form-state="formState" />
    </div>

    <!-- ПРАВАЯ КОЛОНКА -->
    <div class="flex flex-col gap-6">
      <UserFormStatusSection :form-state="formState" />
    </div>

    <!-- ACTIONS -->
    <div class="xl:col-span-3 flex justify-end gap-4 mt-4">
      <NuxtLink to="/users">
        <a-button size="large" class="w-32">{{
          t("products.actions.cancel")
        }}</a-button>
      </NuxtLink>
      <a-button
        type="primary"
        html-type="submit"
        size="large"
        :loading="loading"
        class="w-40 bg-blue-600"
      >
        {{
          isEditMode ? t("products.actions.update") : t("products.actions.save")
        }}
      </a-button>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { UserFormState } from "~/types/user-form";

interface Props {
  userId?: string | string[];
}
const props = defineProps<Props>();

const { t } = useI18n();
const isEditMode = computed(() => !!props.userId);
const loading = ref(false);

// Начальное состояние
const formState = reactive<UserFormState>({
  firstName: "",
  lastName: "",
  maidenName: "",
  age: undefined,
  gender: undefined,
  email: "",
  phone: "",
  username: "",
  birthDate: "",
  image: "",
  bloodGroup: undefined,
  height: undefined,
  weight: undefined,
  eyeColor: undefined,
  role: undefined,
  address: {
    address: "",
    city: "",
    state: "",
    postalCode: "",
  },
  company: {
    name: "",
    title: "",
    department: "",
  },
  university: "",
});

if (isEditMode.value) {
  loading.value = true;
  try {
    const { data } = await useApi<any>(`/users/${props.userId}`);
    if (data.value) {
      Object.assign(formState, {
        ...data.value,

        birthDate: data.value.birthDate
          ? dayjs(data.value.birthDate).format("YYYY-MM-DD")
          : undefined,

        address: data.value.address || {
          address: "",
          city: "",
          state: "",
          postalCode: "",
        },
        company: data.value.company || { name: "", title: "", department: "" },
      });
    }
  } catch (e) {
    message.error(t("messages.error_load"));
  } finally {
    loading.value = false;
  }
}

const handleSubmit = async () => {
  loading.value = true;
  try {
    const url = isEditMode.value ? `/users/${props.userId}` : "/users/add";
    const method = isEditMode.value ? "PUT" : "POST";

    const { error } = await useApi(url, { method, body: formState });

    if (!error.value) {
      message.success(
        isEditMode.value
          ? t("messages.user_success_update")
          : t("messages.user_success_create")
      );
      navigateTo("/users");
    } else {
      throw new Error("API Error");
    }
  } catch (e) {
    message.error(t("messages.error_operation"));
  } finally {
    loading.value = false;
  }
};
</script>
