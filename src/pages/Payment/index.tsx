import { Flex } from 'antd';
import PaymentDetails from '../../components/PaymentDetails';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { publishableKeys } from '../../stripe/config';
import { useEffect, useState } from 'react';
import { useTypedSelector, useStripeActions } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const Payment: React.FC = () => {
  const { clientSecret } = useTypedSelector((state) => (state.stripe));
  const { cartItems, total, cartItemsAmount } = useTypedSelector((state) => (state.cartData));
  const { fetchClientStart } = useStripeActions();
  const [stripePromise] = useState(() => loadStripe(publishableKeys));
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItemsAmount < 1) {
      navigate('/dashboard');
    }
  }, [cartItemsAmount]);

  useEffect(() => {
    fetchClientStart({ cartData: cartItems, total });
  }, [fetchClientStart]);

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
