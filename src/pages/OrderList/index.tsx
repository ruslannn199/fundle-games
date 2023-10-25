import { Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrdersActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks';
import Spinner from '../../components/Spinner';
import OrderDetails from '../../components/OrderDetails';

const OrdersList: React.FC = () => {
  const { isLoading } = useTypedSelector((state) => (state.loader));
  const { orderDetails } = useTypedSelector((state) => (state.ordersData));
  const { getOrderDetailsStart, setOrderDetails } = useOrdersActions();
  const { orderId } = useParams();

  useEffect(() => {
    if (orderId) {
      getOrderDetailsStart(orderId);

      return () => { setOrderDetails(null) };
    }
  }, [getOrderDetailsStart]);

  return (
    <Spin spinning={isLoading} indicator={Spinner}>
      { orderDetails ? <OrderDetails order={orderDetails} /> : null }
    </Spin>
  );
}

export default OrdersList;
