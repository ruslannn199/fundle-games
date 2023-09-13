import { CurrentUser } from '../types/interfaces';

const checkUserIsAdmin = (currentUser: CurrentUser | null): boolean => {
  return !!(currentUser && Array.isArray(currentUser.userRoles)
    && currentUser.userRoles.includes('admin'));
};

export {
  checkUserIsAdmin,
};
