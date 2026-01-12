export const usePosts = () => {
  const total = ref(0);

  // Нам пока нужно только количество для дашборда
  const fetchPostsCount = async () => {
    try {
      const { data } = await useApi<any>("/posts", {
        params: { limit: 1 },
      });
      if (data.value) total.value = data.value.total;
    } catch (e) {
      console.error(e);
    }
  };

  return { total, fetchPostsCount };
};
