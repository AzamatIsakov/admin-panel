// import type { Product } from "~/types/product" // Типы создадим позже или используем any пока

export const useProducts = () => {
  const products = ref<any[]>([]); // Заменим any на Product позже
  const total = ref(0);
  const loading = ref(false);

  // Универсальная функция получения
  const fetchProducts = async (
    params: { limit?: number; skip?: number; q?: string } = {}
  ) => {
    loading.value = true;
    try {
      // Если есть 'q', используем эндпоинт поиска, иначе обычный
      const url = params.q ? "/products/search" : "/products";

      const { data, error } = await useApi<any>(url, {
        params,
      });

      if (data.value) {
        products.value = data.value.products;
        total.value = data.value.total;
        return data.value;
      }
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    total,
    loading,
    fetchProducts,
  };
};
