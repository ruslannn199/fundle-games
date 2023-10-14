// Types
import type { CurrentUser, ProductURLOptions } from '../types/interfaces';
// Utils
import { handleFetchProducts, handleAddProduct, handleDeleteProducts } from './products.utils';
import { handleFetchCategories } from './categories.utils';

const checkUserIsAdmin = (currentUser: CurrentUser | null): boolean => {
  return !!(currentUser && Array.isArray(currentUser.userRoles)
    && currentUser.userRoles.includes('admin'));
};

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

export {
  checkUserIsAdmin,
  makeFetchURL,
  makeComplexProductFetchURL,
  handleFetchProducts,
  handleFetchCategories,
  handleDeleteProducts,
  handleAddProduct,
  convertToMySQLDateTime,
  convertToURLAddress,
  convertFromURLAddress,
};
