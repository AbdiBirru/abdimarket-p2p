export type ListingCategory =
  | "Electronics"
  | "Clothing"
  | "Home"
  | "Accessories"
  | "Vehicles"
  | "Books"
  | "Food"
  | "Services"
  | "Other";

export type PaymentMethod =
  | "Cash"
  | "CBE Birr"
  | "Telebirr"
  | "Bank Transfer"
  | "Other";

export interface Listing {
  id: string;
  title: string;
  photos: string[];
  category: ListingCategory;
  price: number | null; // null means "Negotiable"
  sellerName: string;
  location: string;
  paymentMethods: PaymentMethod[];
  deliveryAvailable: boolean;
  phone: string;
  createdAt: string;
}
