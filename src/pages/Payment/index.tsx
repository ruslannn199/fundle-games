import { Flex } from 'antd';
import PaymentDetails from '../../components/PaymentDetails';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { publishableKeys } from '../../stripe/config';
import { useEffect } from 'react';
import { useTypedSelector, useUserActions } from '../../hooks';

const Payment: React.FC = () => {
  const { fetchClientStart } = useUserActions();
  const { clientSecret } = useTypedSelector((state) => (state.user));

  useEffect(() => {
    fetchClientStart();
  }, []);

  const stripePromise = loadStripe(publishableKeys);

  return (
    clientSecret
    ? (
      <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
        <Flex align="center" justify="center">
          <PaymentDetails />
        </Flex>
      </Elements>
    )
    : null
  );
}

export default Payment;
