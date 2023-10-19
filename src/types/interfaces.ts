import type { User } from 'firebase/auth';
import type { ProductCategoriesTypes } from './enums';

export interface CurrentUser {
  email: string;
  displayName: string;
  id: string;
  photoURL: string | null;
  userRoles: string[];
}

export interface EmailPassword {
  email: string;
  password: string;
}

export interface HandleUser {
  userAuth: User | null;
  moreData?: object;
}

export interface UserCredentials {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Products {
  data: ProductData[];
  isLastPage: boolean;
}

export interface ProductData {
  category: string[];
  productName: string;
  description: string;
  thumbnail: string;
  price: number;
  quantity: number;
  id?: string;
  productAdminUserID?: string;
  createdDate?: string;
}

export interface ProductFormData {
  productCategory: string[];
  productName: string;
  productPrice: string;
  productThumbnail: string;
}

export interface CategoryData {
  id: number;
  category: string;
  type: ProductCategoriesTypes;
}

export interface Filters {
  category?: string;
  query?: string;
  currentPage: number;
}

export interface ProductURLOptions {
  pageSize: number;
  filters?: Filters;
}

export interface FetchProductParams {
  persistProducts?: ProductData[];
  filters: Filters;
  pageSize?: number;
}

export interface ProductDataToCompare {
  prevCartItems: ProductData[];
  nextCartItem: ProductData;
}

export interface StripeClientResponse {
  status: number;
  clientSecret: string;
  message: string;
}
