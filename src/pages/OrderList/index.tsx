import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrdersActions } from '../../hooks/useActions';
import { useAuth, useTypedSelector } from '../../hooks';
import OrderDetails from '../../components/OrderDetails';

const OrdersList: React.FC = () => {
  useAuth();
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { orderDetails } = useTypedSelector((state) => (state.ordersData));
  const { getOrderDetailsStart, setOrderDetails } = useOrdersActions();
  const { orderId } = useParams();

  useEffect(() => {
    if (orderId) {
      getOrderDetailsStart(orderId);

      return () => { setOrderDetails(null) };
    }
  }, [getOrderDetailsStart, orderId, setOrderDetails]);

  return (
    orderDetails && orderDetails.orderUserId === currentUser?.id
      ? <OrderDetails order={orderDetails} />
      : null
  );
}

export default OrdersList;
