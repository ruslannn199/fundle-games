// Components
import { Flex } from 'antd';
import PaymentDetails from '../../components/PaymentDetails';
// Hooks
import { useEffect, useState } from 'react';
import { useTypedSelector, useStripeActions, useCartItems, useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';
// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { publishableKeys } from '../../stripe/config';

const Payment: React.FC = () => {
  useAuth();
  useCartItems();
  const { clientSecret } = useTypedSelector((state) => (state.stripe));
  const { cartItems, total, cartItemsAmount } = useTypedSelector((state) => (state.cartData));
  const { fetchClientStart } = useStripeActions();
  const [stripePromise] = useState(() => loadStripe(publishableKeys, { locale: 'ru' }));
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItemsAmount < 1) {
      navigate('/dashboard');
    }
  }, [cartItemsAmount, navigate]);

  useEffect(() => {
    fetchClientStart({ cartData: cartItems, total });
  }, [fetchClientStart, cartItems, total]);

  return (
    clientSecret
      ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Flex align="center" justify="center">
            <PaymentDetails />
          </Flex>
        </Elements>
      )
      : null
  );
}

export default Payment;
