<template>
  <a-form
    layout="vertical"
    :model="formState"
    @finish="handleSubmit"
    class="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-20"
  >
    <!-- ЛЕВАЯ КОЛОНКА -->
    <div class="xl:col-span-2 flex flex-col gap-6">
      <ProductFormGeneralSection :form-state="formState" />
      <ProductFormMediaSection :form-state="formState" />
      <ProductFormPricingSection :form-state="formState" />
      <ProductFormInventorySection :form-state="formState" />
      <ProductFormShippingSection :form-state="formState" />
    </div>

    <!-- ПРАВАЯ КОЛОНКА -->
    <div class="flex flex-col gap-6">
      <ProductFormOrganizationSection :form-state="formState" />
    </div>

    <!-- Actions Footer -->
    <div class="xl:col-span-3 flex justify-end gap-4 mt-4">
      <NuxtLink to="/products">
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
import type { ProductFormState } from "~/types/form";

interface Props {
  productId?: string | string[];
}

const props = defineProps<Props>();

const { t } = useI18n();
const isEditMode = computed(() => !!props.productId);
const loading = ref(false);

// Реактивное состояние
const formState = reactive<ProductFormState>({
  title: "",
  description: "",
  category: undefined,
  brand: "",
  price: 0,
  discountPercentage: 0,
  stock: 0,
  sku: "",
  weight: 0,
  warrantyInformation: "",
  dimensions: { width: 0, height: 0, depth: 0 },
  tags: [],
  thumbnail: "",
  images: [],
});

// Если есть ID, загружаем данные продукта

if (isEditMode.value) {
  loading.value = true;
  try {
    const { data } = await useApi<any>(`/products/${props.productId}`);
    if (data.value) {
      Object.assign(formState, {
        title: data.value.title,
        description: data.value.description,
        category: data.value.category,
        brand: data.value.brand,
        price: data.value.price,
        discountPercentage: data.value.discountPercentage,
        stock: data.value.stock,
        sku: data.value.sku,
        weight: data.value.weight,
        warrantyInformation: data.value.warrantyInformation || "",
        thumbnail: data.value.thumbnail,
        images: data.value.images || [],
        // API может вернуть теги как undefined, страхуемся
        tags: Array.isArray(data.value.tags) ? data.value.tags : [],
        dimensions: data.value.dimensions || {
          width: 0,
          height: 0,
          depth: 0,
        },
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
    const url = isEditMode.value
      ? `/products/${props.productId}`
      : "/products/add";
    const method = isEditMode.value ? "PUT" : "POST";

    const { error } = await useApi(url, {
      method,
      body: formState,
    });

    if (!error.value) {
      message.success(
        isEditMode.value
          ? t("messages.success_update")
          : t("messages.success_create")
      );
      navigateTo("/products");
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
