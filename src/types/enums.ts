export enum NavigationItemsLabels {
  REGISTRATION = 'registration',
  LOGIN = 'login',
  LOG_OUT = 'Log Out',
  DASHBOARD = 'dashboard',
}

export enum AdminItemsLabels {
  INFO = 'Info',
  HOME = 'Home',
  SIGN_OUT = 'Sign Out',
}

export enum ProductFormFields {
  FORM_NAME = 'productForm',
  PRODUCT_NAME = 'productName',
  CATEGORY = 'productCategory',
  MAIN_IMAGE_URL = 'mainImageURL',
  PRICE = 'price',
}

export enum ProductCategories {
  NEW_PRODUCTS = 'New Products',
  POPULAR = 'Popular',
}

export enum ActionType {
  // Start actions
  EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START',
  EMAIL_SIGN_UP_START = 'EMAIL_SIGN_UP_START',
  EMAIL_SIGN_OUT_START = 'EMAIL_SIGN_OUT_START',
  GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START',
  PASSWORD_RECOVERY_START = 'PASSWORD_RECOVERY_START',
  // Success actions
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
  GOOGLE_SIGN_IN_SUCCESS = 'GOOGLE_SIGN_IN_SUCCESS',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  PASSWORD_RECOVERY_SUCCESS = 'PASSWORD_RECOVERY_SUCCESS',
  // Error
  USER_ERROR = 'USER_ERROR',
  // Other
  CHECK_USER_SESSION = 'CHECK_USER_SESSION',
  RESET_USER_STATE = 'RESET_USER_STATE',
}
