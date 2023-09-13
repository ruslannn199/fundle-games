import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypedSelector from './useTypedSelector';
import { checkUserIsAdmin } from '../utils';

const useAdminAuth = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) navigate('/');
  }, [currentUser, navigate]);
}

export default useAdminAuth;
