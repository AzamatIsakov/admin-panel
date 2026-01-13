import type { User, UserResponse } from "~/types/user";

export const useUsers = () => {
  const users = ref<User[]>([]);
  const total = ref(0);
  const loading = ref(false);

  const { t } = useI18n();

  const pagination = reactive({
    current: 1,
    pageSize: 10,
  });

  const filters = reactive({
    search: "",
    gender: undefined as string | undefined,
    role: undefined as string | undefined,
  });

  const fetchUsers = async (
    params: {
      page?: number;
      pageSize?: number;
      search?: string;
      gender?: string;
      role?: string;
      limit?: number;
      skip?: number;
    } = {}
  ) => {
    loading.value = true;

    pagination.current = params.page || pagination.current;
    pagination.pageSize = params.pageSize || pagination.pageSize;

    // Обновляем фильтры, если они переданы (даже если undefined, чтобы сбросить)
    filters.search = params.search || "";
    filters.gender = params.gender;
    filters.role = params.role;

    const limit = pagination.pageSize;
    const skip = (pagination.current - 1) * limit;

    try {
      let url = "/users";
      const queryParams: any = { limit, skip };

      // DummyJSON Limitation: Нельзя комбинировать /search и /filter
      // Приоритет: 1. Поиск, 2. Роль, 3. Пол
      if (filters.search) {
        url = "/users/search";
        queryParams.q = filters.search;
      } else if (filters.role) {
        url = "/users/filter";
        queryParams.key = "role";
        queryParams.value = filters.role;
      } else if (filters.gender) {
        url = "/users/filter";
        queryParams.key = "gender";
        queryParams.value = filters.gender;
      }

      const { data } = await useApi<UserResponse>(url, { params: queryParams });

      if (data.value) {
        users.value = data.value.users.map((u) => ({
          ...u,
          // Генерируем статус isActive (так как его нет в API)
          // Генерируем роль ТОЛЬКО если она не пришла с API (для надежности)
          isActive: u.isActive !== undefined ? u.isActive : u.id % 2 !== 0,
          role: u.role || "user",
        }));
        total.value = data.value.total;
      }
    } catch (e) {
      console.error("Error fetching users:", e);
    } finally {
      loading.value = false;
    }
  };

  const toggleStatus = (id: number) => {
    const user = users.value.find((u) => u.id === id);
    if (user) {
      user.isActive = !user.isActive;
      if (user.isActive) {
        message.success(t("users.messages.status_active"));
      } else {
        message.warning(t("users.messages.status_inactive"));
      }
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await useApi(`/users/${id}`, { method: "DELETE" });
      users.value = users.value.filter((u) => u.id !== id);
      total.value--;

      message.success(t("users.messages.deleted"));
    } catch (e) {
      message.error(t("users.messages.failed"));
    }
  };

  return {
    users,
    total,
    loading,
    pagination,
    filters,
    fetchUsers,
    toggleStatus,
    deleteUser,
  };
};
