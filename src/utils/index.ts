// Types
import type { CurrentUser, ProductURLOptions } from '../types/interfaces';
// Utils
import { handleFetchProducts, handleAddProduct, handleDeleteProducts } from './products.utils';
import { handleFetchCategories } from './categories.utils';
import { handleAddToCart } from '../redux/Cart/cart.utils';
import axios from 'axios';

const checkUserIsAdmin = (currentUser: CurrentUser | null): boolean => {
  return !!(currentUser && Array.isArray(currentUser.userRoles)
    && currentUser.userRoles.includes('admin'));
};

const stripeApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const makeFetchURL = (str: string): string => (
  `http://localhost/fundle-games/api/records/${str}`
);

const makeComplexProductFetchURL = (
    { pageSize, filters }: ProductURLOptions
  ): string => (
  `${
    makeFetchURL('products?order=createdDate,desc')
  }${
    filters?.category
      ? `&filter=category,cs,${filters.category}`
      : ''
  }${
    filters?.query
      ? `&filter1=productName,cs,${filters.query}&filter2=description,cs,${filters.query}`
      : ''
  }${
    filters?.currentPage
      ? `&page=${filters.currentPage},${pageSize}`
      : ''
  }`
);

const convertToMySQLDateTime = (date: Date): string => (
  date.toISOString().slice(0, 19).replace('T', ' ')
);

const convertToURLAddress = (str: string): string => (
  str.toLowerCase().replaceAll(' ', '-')
);

const convertFromURLAddress = (str: string): string => (
  str
    .split('')
    .map((char, index) => {
      if (index === 0) {
        return char.toUpperCase();
      }
      if (char === '-') {
        return ' ';
      }
      return char;
    })
    .join('')
);

const countriesList = new Map<string, string>();
countriesList
  .set('RU', 'Russia').set('FI', 'Finland').set('GE', 'Georgia').set('RO', 'Romania').set('US', 'United States')
  .set('KZ', 'Kazakhstan').set('GB', 'United Kingdom').set('DE', 'Germany').set('FR', 'France').set('IT', 'Italy')
  .set('ES', 'Spain').set('PL', 'Poland').set('BY', 'Belarus').set('EE', 'Estonia').set('LV', 'Latvia')
  .set('LT', 'Lithuania').set('AM', 'Armenia').set('AZ', 'Azerbaijan').set('MD', 'Moldavia').set('AT', 'Austria');

const countryOptions = (): Record<'label' | 'value', string>[] => {
  const options = [];
  for (const [abb, name] of countriesList) {
    options.push({
      label: name,
      value: abb,
    });
  }
  return options;
}

export {
  stripeApi,
  checkUserIsAdmin,
  makeFetchURL,
  makeComplexProductFetchURL,
  handleFetchProducts,
  handleFetchCategories,
  handleDeleteProducts,
  handleAddProduct,
  handleAddToCart,
  convertToMySQLDateTime,
  convertToURLAddress,
  convertFromURLAddress,
  countryOptions,
};
