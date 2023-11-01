import { ConfigProvider, Flex } from 'antd';
import { Order } from '../../types/interfaces';
import { orangeTheme } from '../../utils/themes';
import { OrderDetailsDateInfo, OrderDetailsDocumentId, OrderDetailsSubTitle, OrderDetailsText, OrderDetailsTitle, OrderDetailsWrapper } from './OrderDetails.styles';
import { convertFromMySQLDateTime } from '../../utils';
import OrderDetailsItem from '../OrderDetailsItem';
import { useWindowDimensions } from '../../hooks';

interface OrderDetailsProps extends React.RefAttributes<HTMLDivElement> {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order: {
  documentId, orderCreatedDate, orderItems, orderTotal
}}) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  return (
    <OrderDetailsWrapper vertical justify="center">
      <ConfigProvider theme={orangeTheme}>
        <Flex align={isMobile ? "flex-start" : "center"} vertical={isMobile}>
          <OrderDetailsTitle>Заказ №</OrderDetailsTitle>
          <OrderDetailsDocumentId
            copyable={{ text: documentId }}
            style={{ margin: 0 }}
          >
            {documentId.replaceAll('-', ' ')}
          </OrderDetailsDocumentId>
        </Flex>
      </ConfigProvider>
      <OrderDetailsDateInfo vertical justify="center">
        <OrderDetailsSubTitle>Дата покупки</OrderDetailsSubTitle>
        <OrderDetailsText>{orderCreatedDate && convertFromMySQLDateTime(orderCreatedDate)}</OrderDetailsText>
      </OrderDetailsDateInfo>
      <Flex vertical justify="center" gap="4rem">
        {...(orderItems.map((item, index) => (
          <OrderDetailsItem key={index} item={item} />
        )))}
      </Flex>
      <h3>
        Итого: {orderTotal}₽
      </h3>
    </OrderDetailsWrapper>
  );
}

export default OrderDetails;
