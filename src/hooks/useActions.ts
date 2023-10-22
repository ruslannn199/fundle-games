import { useDispatch } from 'react-redux'
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import {
  UserActionCreators,
  ProductsActionCreators,
  LoadingActionCreators,
  CategoriesActionsCreators,
  CartActionCreators,
  StripeActionCreators,
} from '../redux';

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
};

export const useLoadingActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(LoadingActionCreators, dispatch)
  }, [dispatch]);
}

export const useCategoriesActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(CategoriesActionsCreators, dispatch)
  }, [dispatch]);
}

export const useCartActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(CartActionCreators, dispatch)
  }, [dispatch]);
}

export const useStripeActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(StripeActionCreators, dispatch)
  }, [dispatch]);
}
