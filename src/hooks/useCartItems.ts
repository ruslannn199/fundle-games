import { useNavigate } from 'react-router-dom';
import useTypedSelector from './useTypedSelector';
import { useEffect } from 'react';

const useCartItems = () => {
  const { cartItemsAmount } = useTypedSelector((state) => (state.cartData));
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartItemsAmount) navigate('/dashboard');
  }, [cartItemsAmount, navigate]);

  return cartItemsAmount;
}

export default useCartItems;
