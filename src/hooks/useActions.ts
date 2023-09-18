import { useDispatch } from 'react-redux'
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { ProductsActionCreators, UserActionCreators } from '../redux';

export const useUserActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(UserActionCreators, dispatch)
  }, [dispatch]);
};

export const useProductsActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(ProductsActionCreators, dispatch)
  }, [dispatch]);
}
