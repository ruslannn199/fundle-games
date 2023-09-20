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
  THUMBNAIL = 'productThumbnail',
  PRICE = 'productPrice',
  DESCRIPTION = 'productDescription',
}

export enum ProductCategories {
  NEW_PRODUCTS = 'New products',
  POPULAR = 'Popular',
  PARTY_GAMES = 'Party games',
  FAMILY_FRIENDLY = 'Family-friendly',
  HARDCORE = 'Hardcore',
  CARD_GAMES = 'Card games',
  DETECTIVE = 'Detective',
  ECONOMIC = 'Economic',
  CLASSIC = 'Classic',
  ADVENTURE = 'Adventure',
  STRATEGY = 'Strategy',
}

export enum ProductCategoriesTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
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
