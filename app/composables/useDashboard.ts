export const useDashboard = () => {
  const loading = ref(false);

  const { fetchUsers, total: totalUsers } = useUsers();
  const { fetchProducts, total: totalProducts } = useProducts();
  const { fetchPostsCount, total: totalPosts } = usePosts();

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
        fetchUsers({ limit: 1 }),
        fetchProducts({ limit: 1 }),
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
