// Components
import CheckoutItem from '../CheckoutItem';
import { CheckoutEmpty, CheckoutTotal, CheckoutTotalWrapper, CheckoutWrapper } from './Checkout.styles';
// Hooks
import { useTypedSelector } from '../../hooks';
import { useCartActions, useProductsActions } from '../../hooks/useActions';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cartItems, total } = useTypedSelector((state) => (state.cartData));
  const { product } = useTypedSelector((state) => (state.productsData));
  const { setProduct } = useProductsActions();
  const { addToCart } = useCartActions();
  const location = useLocation();
  const isCheckoutPage = location.pathname.includes('checkout');

  useEffect(() => {
    if (isCheckoutPage) {
      if (product) {
        addToCart(product);
      }
      return () => { setProduct(null) };
    }
  }, [product, setProduct]);

  return (
    cartItems.length
      ? (
        <CheckoutWrapper vertical align="center">
          {...(cartItems.map((item) => (<CheckoutItem productData={item} />)))}
          <CheckoutTotalWrapper align="center" gap=".7rem" justify="flex-end">
            Итого:<CheckoutTotal>{total}₽</CheckoutTotal>
          </CheckoutTotalWrapper>
        </CheckoutWrapper>
      )
      : <CheckoutEmpty description="You cart is empty" />
  );
}

export default Checkout;
