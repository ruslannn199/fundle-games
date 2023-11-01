import { ConfigProvider, Flex } from 'antd';
import { Order } from '../../types/interfaces';
import {
  OrderCardDocumentId,
  OrderCardItemsImage,
  OrderCardItemsInfo,
  OrderCardMore,
  OrderCardNeutralLink,
  OrderCardTimestamp,
  OrderCardTotal,
  OrderCardWrapper } from './OrderCard.styles';
import { convertFromMySQLDateTime } from '../../utils';
import { orangeTheme } from '../../utils/themes';
import { useWindowDimensions } from '../../hooks';

interface OrderCardProps extends React.RefAttributes<HTMLDivElement> {
  items: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ items }) => {
  const { width } = useWindowDimensions();

  const orderIdLink = `/order/${items.documentId}`;
  const isMobile = width <= 768;
  const maximumAmountOfImages = 3;

  return (
    <OrderCardWrapper
      align={isMobile ? "flex-start" : "center"}
      justify="space-between"
      vertical={isMobile}
    >
      <Flex vertical gap="1rem" justify="flex-start" align="flex-start">
        <OrderCardTimestamp to={orderIdLink}>
          Заказ от {items.orderCreatedDate && convertFromMySQLDateTime(items.orderCreatedDate)}
        </OrderCardTimestamp>
        <OrderCardNeutralLink to={orderIdLink}>
          № заказа:
          <ConfigProvider theme={orangeTheme}>
            <OrderCardDocumentId copyable={{ text: items.documentId.replaceAll('-', ' ')}}>
              {items.documentId.replaceAll('-', ' ')}
            </OrderCardDocumentId>
          </ConfigProvider>
        </OrderCardNeutralLink>
      </Flex>
      <OrderCardItemsInfo vertical gap="1rem" align={isMobile ? "flex-start" : "flex-end"}>
        <OrderCardTotal to={orderIdLink}>{items.orderTotal}₽</OrderCardTotal>
        <Flex gap="1rem">
          {...(items.orderItems
            .slice(0, maximumAmountOfImages + 1)
            .map((item, index) => (
              <OrderCardNeutralLink to={orderIdLink}>
                {index < maximumAmountOfImages
                  ? <OrderCardItemsImage src={item.thumbnail} alt="item" />
                  : <OrderCardMore>+{items.orderItems.length - maximumAmountOfImages}</OrderCardMore>
                }
              </OrderCardNeutralLink>
          )))}
        </Flex>
      </OrderCardItemsInfo>
    </OrderCardWrapper>
  );
}

export default OrderCard;
