// Types
import type { CurrentUser } from '../types/interfaces';
// Utils
import { handleFetchProducts, handleAddProduct, handleDeleteProducts, getCategories } from './products.utils';

const checkUserIsAdmin = (currentUser: CurrentUser | null): boolean => {
  return !!(currentUser && Array.isArray(currentUser.userRoles)
    && currentUser.userRoles.includes('admin'));
};

const makeFetchURL = (str: string): string => (
  `http://localhost/fundle-games/api/records/${str}`
);

const convertToMySQLDateTime = (date: Date): string => (
  date.toISOString().slice(0, 19).replace('T', ' ')
);

export {
  checkUserIsAdmin,
  makeFetchURL,
  handleFetchProducts,
  handleDeleteProducts,
  handleAddProduct,
  getCategories,
  convertToMySQLDateTime,
};
