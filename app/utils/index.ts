export const formatMoney = (num: number) => {
  return typeof num === "number"
    ? new Intl.NumberFormat("en-US").format(num)
    : num;
};
