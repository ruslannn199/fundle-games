import { ConfigProvider, Flex, Skeleton } from 'antd';
import { Order } from '../../types/interfaces';
import { orangeTheme } from '../../utils/themes';
import { OrderDetailsDateInfo, OrderDetailsDocumentId, OrderDetailsSubTitle, OrderDetailsText, OrderDetailsTitle, OrderDetailsWrapper } from './OrderDetails.styles';
import { convertFromMySQLDateTime } from '../../utils';
import OrderDetailsItem from '../OrderDetailsItem';
import { useTypedSelector, useWindowDimensions } from '../../hooks';

interface OrderDetailsProps extends React.RefAttributes<HTMLDivElement> {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order: {
  documentId, orderCreatedDate, orderItems, orderTotal
}}) => {
  const { loadingQueue } = useTypedSelector((state) => (state.loader));
  const { width } = useWindowDimensions();
  const isLoading = !!loadingQueue.length;
  const isMobile = width <= 768;

  return (
    isLoading
      ? (
        <OrderDetailsWrapper vertical justify="center">
          <Skeleton.Input active style={{
            width: "100%",
            height: isMobile ? "5.075rem" : "1.6rem",
            margin: isMobile ? 0 : "1.328rem 0"
          }} />
          <OrderDetailsDateInfo vertical justify="center">
            <Skeleton.Input active style={{
              height: isMobile ? "1rem" : "1.4rem"
            }} />
            <Skeleton.Input active style={{
              height: isMobile ? "1rem" : "1.4rem"
            }} />
          </OrderDetailsDateInfo>
          <Flex vertical justify="center" gap="4rem">
            {orderItems.map((item, index) => (
              <Skeleton.Input
                key={index}
                style={{
                  width: "100%",
                  marginBottom: "3rem",
                  height: isMobile ? "6rem" : "8rem",
                }}
              />
            ))}
          </Flex>
          <Skeleton.Input active style={{
            height: isMobile ? "1.17rem" : "1.6375rem",
            margin: isMobile ? "1.17rem 0" : "1.638rem 0",
          }} />
        </OrderDetailsWrapper>
      )
      : (
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
            {orderItems.map((item, index) => (
              <OrderDetailsItem key={index} item={item} />
            ))}
          </Flex>
          <h3>
            Итого: {orderTotal}₽
          </h3>
        </OrderDetailsWrapper>
      )
  );
}

export default OrderDetails;
