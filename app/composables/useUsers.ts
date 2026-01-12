export const useUsers = () => {
  const users = ref<any[]>([]);
  const total = ref(0);
  const loading = ref(false);

  const fetchUsers = async (
    params: { limit?: number; skip?: number; q?: string } = {}
  ) => {
    loading.value = true;
    try {
      const url = params.q ? "/users/search" : "/users";

      const { data } = await useApi<any>(url, { params });

      if (data.value) {
        users.value = data.value.users;
        total.value = data.value.total;
        return data.value;
      }
    } catch (e) {
      console.error("Error fetching users:", e);
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    total,
    loading,
    fetchUsers,
  };
};
