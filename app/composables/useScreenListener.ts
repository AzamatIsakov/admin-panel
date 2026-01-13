export const useScreenListener = () => {
  const uiStore = useUiStore();

  // Функция debounce (простая реализация)
  let timeoutId: any = null;

  const handleResize = () => {
    uiStore.width = window.innerWidth;
    uiStore.height = window.innerHeight;

    // Но куку пишем с задержкой, чтобы не спамить
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      uiStore.updateDimensions();
    }, 300);
  };

  onMounted(() => {
    // Сразу при загрузке обновляем актуальные размеры
    // (вдруг пользователь повернул экран или кука устарела)
    uiStore.updateDimensions();

    // Слушаем изменение размера
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    clearTimeout(timeoutId);
  });
};
