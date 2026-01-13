export const formatMoney = (num: number) => {
  return typeof num === "number"
    ? new Intl.NumberFormat("en-US").format(num)
    : num;
};

export const capitalizeFirst = (str: string) =>
  `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`;
