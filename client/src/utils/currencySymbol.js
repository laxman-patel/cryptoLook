const currencyMappings = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
};

export const currencySymbol = currency => {
  return currencyMappings[currency];
};
