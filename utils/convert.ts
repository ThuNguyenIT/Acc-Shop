export const convertMoney = (value: number | bigint) => {
  return value ? new Intl.NumberFormat("en-US").format(value) : "0";
};
