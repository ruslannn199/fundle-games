import type { User } from 'firebase/auth';
import { ProductCategories, ProductCategoriesTypes, ProductFormFields } from './enums';
import { DocumentData } from 'firebase/firestore';

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
  name: string;
  description: string;
  thumbnail: string;
  price: number;
  quantity: number;
  documentId?: string;
  productAdminUserUID?: string;
  createdDate?: Date;
}

export interface ProductFormData {
  productCategory: string[];
  productName: string;
  productPrice: string;
  productThumbnail: string;
  productDescription: string;
}

export interface CategoryDocument {
  category: ProductCategories;
  type: ProductCategoriesTypes;
}
