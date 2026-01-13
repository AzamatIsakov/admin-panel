// composables/useProducts.ts
import type { Product, ProductResponse } from "~/types/product";

export const useProducts = () => {
  const products = ref<Product[]>([]);
  const total = ref(0);
  const loading = ref(false);

  // Состояние таблицы (для страницы продуктов)
  const pagination = reactive({
    current: 1,
    pageSize: 9, // На скрине видно "Showing 1-09", значит по 9 элементов
  });

  // Аргумент params сделаем гибким.
  // Он может принимать пагинацию (page, pageSize) ИЛИ прямые параметры API (limit, skip)
  const fetchProducts = async (
    params: {
      page?: number;
      pageSize?: number;
      search?: string;
      limit?: number; // Для совместимости с Dashboard
      skip?: number; // Для совместимости с Dashboard
    } = {}
  ) => {
    loading.value = true;

    // Логика: Если передали page/pageSize, считаем skip/limit.
    // Если передали limit напрямую (как в dashboard), используем его.

    let limit = params.limit ?? pagination.pageSize;
    let skip = params.skip ?? 0;

    if (params.page) {
      pagination.current = params.page;
      skip = (params.page - 1) * limit;
    }

    if (params.pageSize) {
      pagination.pageSize = params.pageSize;
      limit = params.pageSize;
    }

    const q = params.search || "";

    try {
      const url = q ? "/products/search" : "/products";

      const { data } = await useApi<ProductResponse>(url, {
        params: {
          limit,
          skip,
          q,
          // select: 'title,price,category...' // Можно оптимизировать, но пока берем всё
        },
      });

      if (data.value) {
        products.value = data.value.products;
        total.value = data.value.total;
      }
    } catch (e) {
      console.error("Error fetching products:", e);
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
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  return {
    products,
    total,
    loading,
    pagination,
    fetchProducts,
    deleteProduct,
  };
};
