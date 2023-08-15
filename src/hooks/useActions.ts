import { useDispatch } from 'react-redux'
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { UserActionCreators } from '../redux';

export const useUserActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(UserActionCreators, dispatch)
  }, [dispatch]);
};
