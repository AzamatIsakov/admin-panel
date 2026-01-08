export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // Список публичных страниц, куда можно без авторизации
  const publicPages = ["/login"];

  // Проверяем, является ли текущая страница публичной
  const authRequired = !publicPages.includes(to.path);

  // 1. Если страница требует авторизации, а токена нет -> редирект на логин
  if (authRequired && !authStore.token) {
    return navigateTo("/login");
  }

  // 2. Если мы уже авторизованы и пытаемся зайти на логин -> редирект на главную
  if (to.path === "/login" && authStore.token) {
    return navigateTo("/");
  }
});
