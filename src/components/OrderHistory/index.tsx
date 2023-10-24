import { useTypedSelector } from '../../hooks';
import OrderCard from '../OrderCard';
import { OrderHistoryWrapper } from './OrderHistory.styles';

const OrderHistory: React.FC = () => {
  const { orderHistory } = useTypedSelector((state) => (state.ordersData));

  return (
    <OrderHistoryWrapper vertical justify="center" align="center" gap="10rem">
      {orderHistory.map((order, index) => (<OrderCard key={index} items={order} />))}
    </OrderHistoryWrapper>
  );
}

export default OrderHistory;
