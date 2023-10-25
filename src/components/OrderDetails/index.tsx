import { ConfigProvider, Flex } from 'antd';
import { Order } from '../../types/interfaces';
import { orangeTheme } from '../../utils/themes';
import { OrderDetailsDocumentId, OrderDetailsSubTitle, OrderDetailsTitle, OrderDetailsWrapper } from './OrderDetails.styles';
import { convertFromMySQLDateTime } from '../../utils';
import OrderDetailsItem from '../OrderDetailsItem';

interface OrderDetailsProps extends React.RefAttributes<HTMLDivElement> {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <OrderDetailsWrapper vertical justify="center" gap="3rem">
      <ConfigProvider theme={orangeTheme}>
        <Flex align="center">
          <OrderDetailsTitle>Заказ №</OrderDetailsTitle>
          <OrderDetailsDocumentId
            copyable={{ text: order.documentId }}
            style={{ margin: 0, fontSize: "3rem" }}
          >
            {order.documentId.replaceAll('-', ' ')}
          </OrderDetailsDocumentId>
        </Flex>
      </ConfigProvider>
      <Flex vertical justify="center" gap="3rem">
        <OrderDetailsSubTitle>Дата покупки</OrderDetailsSubTitle>
        {order.orderCreatedDate && convertFromMySQLDateTime(order.orderCreatedDate)}
      </Flex>
      <Flex vertical justify="center" gap="4rem">
        {...(order.orderItems.map((item, index) => (
          <OrderDetailsItem key={index} item={item} />
        )))}
      </Flex>
      <h3>
        Итого: {order.orderTotal}₽
      </h3>
    </OrderDetailsWrapper>
  );
}

export default OrderDetails;
