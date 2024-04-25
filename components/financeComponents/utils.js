export const tryCurrencyFormat = (value) => {
  const formattedValue = new Intl.NumberFormat("tr-TR", {
    style: "decimal",
    currency: "TRY",
  }).format(value);
  return formattedValue + " ₺";
};
