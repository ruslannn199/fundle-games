// Components
import { Flex } from 'antd';
import PaymentDetails from '../../components/PaymentDetails';
// Hooks
import { useAuth } from '../../hooks';

const Payment: React.FC = () => {
  useAuth();
  return (
    <Flex align="center" justify="center">
      <PaymentDetails />
    </Flex>
  );
}

export default Payment;
