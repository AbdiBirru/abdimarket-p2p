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

export function getPaymentMethodLabel(value: string) {
  return PAYMENT_METHODS.find((p) => p.value === value)?.label ?? value;
}

export const REPORT_REASONS = [
  { value: "PROHIBITED_ITEM", label: "Prohibited item" },
  { value: "SCAM_OR_FRAUD", label: "Scam or fraud" },
  { value: "SPAM", label: "Spam" },
  { value: "INAPPROPRIATE", label: "Inappropriate content" },
  { value: "OTHER", label: "Other" },
] as const;

export function getReportReasonLabel(value: string) {
  return REPORT_REASONS.find((r) => r.value === value)?.label ?? value;
}

export const CATEGORY_DETAIL_FIELDS: Record<string, string[]> = {
  ELECTRONICS: ["Brand", "Model", "Storage", "RAM", "Screen Size", "Condition"],
  CLOTHING: ["Brand", "Size", "Material", "Condition"],
  HOME: ["Brand", "Material", "Dimensions", "Condition"],
  ACCESSORIES: ["Brand", "Material", "Condition"],
  VEHICLES: ["Make", "Model", "Year", "Mileage (km)", "Fuel Type", "Transmission"],
  BOOKS: ["Author", "Language", "Condition"],
  FOOD: ["Quantity / Weight", "Expiry Date"],
  SERVICES: ["Experience", "Availability"],
  OTHER: ["Condition"],
};
