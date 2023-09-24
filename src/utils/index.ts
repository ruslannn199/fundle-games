import { CurrentUser } from '../types/interfaces';
import { handleFetchProducts, handleAddProduct, handleDeleteProducts } from './products.utils';

const checkUserIsAdmin = (currentUser: CurrentUser | null): boolean => {
  return !!(currentUser && Array.isArray(currentUser.userRoles)
    && currentUser.userRoles.includes('admin'));
};

const makeFetchURL = (str: string): string => (
  `http://localhost/fundle-games/api/records/${str}`
)

export {
  checkUserIsAdmin,
  makeFetchURL,
  handleFetchProducts,
  handleDeleteProducts,
  handleAddProduct,
};
