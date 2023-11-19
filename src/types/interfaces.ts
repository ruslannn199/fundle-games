import type { User } from 'firebase/auth';
import type { ProductCategoriesTypes } from './enums';
import { ReactCreditCardsProps } from 'react-credit-cards-2';

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

export interface ProductMainData {
  productName: string;
  thumbnail: string;
  price: number;
  quantity: number;
  id: string;
}

export interface ProductData extends ProductMainData {
  category: string[];
  description: string;
  productAdminUserID?: string;
  createdDate?: string;
}

export interface Products {
  data: ProductData[];
  isLastPage: boolean;
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

export interface CreditCardData extends Pick<ReactCreditCardsProps, 'cvc' | 'name' | 'number' | 'expiry' | 'focused'> {}

export interface AddressDetails {
  name: string;
  address: {
    city: string;
    line1: string;
    postalCode: string;
    state: string;
    country: string;
    line2?: string;
  }
}

interface RequiredPaymentMethodData {
  card: CreditCardData;
  billingDetails: AddressDetails;
}

export interface RequiredConfirmCardPaymentData {
  billing: RequiredPaymentMethodData;
  shipping: AddressDetails;
}

export interface PaymentActionPayload {
  cardPaymentData: RequiredConfirmCardPaymentData;
  cartData: ProductData[];
  total: number;
  success?: boolean;
}

export interface Order {
  documentId: string;
  orderTotal: number;
  orderItems: ProductMainData[];
  orderCreatedDate?: string;
  orderUserId?: string;
}
