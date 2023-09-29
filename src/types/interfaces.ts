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
  productDescription: string;
}

export interface CategoryData {
  id: number;
  category: string;
  type: ProductCategoriesTypes;
}

export interface ProductURLOptions {
  requestedPage: number;
  pageSize: number;
}

export interface FetchProductParams {
  currentPage: number;
  persistProducts?: ProductData[];
  filterType?: string;
}
