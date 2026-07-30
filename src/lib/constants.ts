export const CATEGORIES = [
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "CLOTHING", label: "Clothing" },
  { value: "HOME", label: "Home" },
  { value: "ACCESSORIES", label: "Accessories" },
  { value: "VEHICLES", label: "Vehicles" },
  { value: "BOOKS", label: "Books" },
  { value: "FOOD", label: "Food" },
  { value: "SERVICES", label: "Services" },
  { value: "OTHER", label: "Other" },
] as const;

export const PAYMENT_METHODS = [
  { value: "CASH", label: "Cash" },
  { value: "CBE_BIRR", label: "CBE Birr" },
  { value: "TELEBIRR", label: "Telebirr" },
  { value: "BANK_TRANSFER", label: "Bank Transfer" },
  { value: "OTHER", label: "Other" },
] as const;

export function getCategoryLabel(value: string) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
