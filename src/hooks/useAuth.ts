import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTypedSelector from './useTypedSelector';

const useAuth = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  return currentUser;
}

export default useAuth;
