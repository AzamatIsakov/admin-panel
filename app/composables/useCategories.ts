// DummyJSON возвращает массив объектов: [{ slug: 'beauty', name: 'Beauty', url: '...' }]
interface CategoryItem {
  slug: string;
  name: string;
  url: string;
}

export const useCategories = () => {
  const categories = ref<{ value: string; label: string }[]>([]);
  const loading = ref(false);

  const fetchCategories = async () => {
    // Если уже загружали - не грузим повторно (кэширование в рамках сессии компонента)
    if (categories.value.length > 0) return;

    loading.value = true;
    try {
      const { data } = await useApi<CategoryItem[]>("/products/categories");

      if (data.value) {
        // Преобразуем в формат { value, label } для Ant Design Select
        categories.value = data.value.map((cat) => ({
          value: cat.slug,
          label: cat.name,
        }));
      }
    } catch (e) {
      console.error("Failed to load categories", e);
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    loading,
    fetchCategories,
  };
};
