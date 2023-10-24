import { ConfigProvider, Flex, Spin } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrdersActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks';
import Spinner from '../../components/Spinner';
import { OrderCardDocumentId } from '../../components/OrderCard/OrderCart.styles';
import { orangeTheme } from '../../utils/themes';

const OrderDetails: React.FC = () => {
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
      {
        orderDetails ?
          (
            <Flex vertical justify="center" style={{ padding: "1rem" }}>
              <ConfigProvider theme={orangeTheme}>
                Заказ №:<OrderCardDocumentId copyable={{ text: orderDetails.documentId }}>
                  {orderDetails.documentId.replaceAll('-', ' ')}
                </OrderCardDocumentId>
              </ConfigProvider>
              <h3>
                Total: {orderDetails.orderTotal}
              </h3>
            </Flex>
          )
          : null
      }
    </Spin>
  );
}

export default OrderDetails;
