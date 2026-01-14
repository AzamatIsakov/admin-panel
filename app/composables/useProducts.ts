import type { Product, ProductResponse } from "~/types/product";

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const total = ref(0);
  const loading = ref(false);

  const { t } = useI18n();

  const pagination = reactive({
    current: 1,
    pageSize: 10,
  });

  // Новые состояния для сортировки
  const sortState = reactive({
    sortBy: "", // например 'price'
    order: "", // 'asc' или 'desc'
  });

  const fetchProducts = async (
    params: {
      page?: number;
      pageSize?: number;
      search?: string;
      limit?: number;
      skip?: number;
      sortBy?: string;
      order?: "asc" | "desc";
    } = {}
  ) => {
    loading.value = true;

    // Обновляем локальный стейт
    pagination.current = params.page || 1;
    pagination.pageSize = params.pageSize || 10;
    sortState.sortBy = params.sortBy || "";
    sortState.order = params.order || "";

    const limit = pagination.pageSize;
    const skip = (pagination.current - 1) * limit;
    const q = params.search || "";

    try {
      // DummyJSON Search не поддерживает сортировку одновременно (ограничение API).
      // Поэтому логика такая: Если есть поиск -> используем /search (без сортировки).
      // Если поиска нет -> используем /products (с сортировкой).

      let url = "/products";
      const queryParams: any = { limit, skip };

      if (q) {
        url = "/products/search";
        queryParams.q = q;
      } else {
        // Добавляем параметры сортировки только если нет поиска
        if (sortState.sortBy && sortState.order) {
          queryParams.sortBy = sortState.sortBy;
          queryParams.order = sortState.order;
        }
      }

      const { data } = await useApi<ProductResponse>(url, {
        params: queryParams,
      });

      if (data.value) {
        products.value = data.value.products;
        total.value = data.value.total;
      }
    } catch (e) {
      console.error("Error fetching products:", e);
      message.error(t("messages.error_operation"));
    } finally {
      loading.value = false;
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await useApi(`/products/${id}`, { method: "DELETE" });
      // Оптимистичное удаление из UI
      products.value = products.value.filter((p) => p.id !== id);
      total.value--;

      message.success(t("messages.product_success_delete"));
    } catch (e) {
      console.error("Delete failed", e);
      message.error(t("messages.error_operation"));
    }
  };

  return {
    products,
    total,
    loading,
    pagination,
    sortState,
    fetchProducts,
    deleteProduct,
  };
};
