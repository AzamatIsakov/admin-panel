export const useDashboard = () => {
  const loading = ref(false);

  // Подключаем наши новые хуки
  const { fetchUsers, total: totalUsers } = useUsers();
  const { fetchProducts, total: totalProducts } = useProducts();
  const { fetchPostsCount, total: totalPosts } = usePosts();

  // Итоговая статистика для UI
  // Мы используем computed, чтобы они реактивно обновлялись, когда обновляются хуки
  const stats = reactive({
    users: computed(() => totalUsers.value),
    products: computed(() => totalProducts.value),
    posts: computed(() => totalPosts.value),
    sales: 89000,
    orders: 10293,
  });

  const fetchStats = async () => {
    loading.value = true;
    try {
      // Запрашиваем параллельно
      await Promise.all([
        fetchUsers({ limit: 1 }), // Нам нужно только количество
        fetchProducts({ limit: 1 }), // Нам нужно только количество
        fetchPostsCount(),
      ]);
    } catch (e) {
      console.error("Dashboard init error", e);
    } finally {
      loading.value = false;
    }
  };

  return {
    stats,
    loading,
    fetchStats,
  };
};
