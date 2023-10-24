import { ConfigProvider, Flex } from 'antd';
import { Order } from '../../types/interfaces';
import { OrderCardDocumentId, OrderCardItemsImage, OrderCardItemsInfo, OrderCardMore, OrderCardNeutralLink, OrderCardTimestamp, OrderCardTotal, OrderCardWrapper } from './OrderCart.styles';
import { Link } from 'react-router-dom';
import { convertFromMySQLDateTime } from '../../utils';
import Paragraph from 'antd/es/typography/Paragraph';
import { orangeTheme } from '../../utils/themes';

interface OrderCardProps extends React.RefAttributes<HTMLDivElement> {
  items: Required<Order>;
}

const OrderCard: React.FC<OrderCardProps> = ({ items }) => {
  const orderIdLink = `/order/${items.documentId}`;

  return (
    <OrderCardWrapper
      align="center"
      justify="space-between"
      gap="5rem"
    >
      <Flex vertical gap="1rem" justify="flex-start" align="flex-start">
        <OrderCardTimestamp to={orderIdLink}>Заказ от {convertFromMySQLDateTime(items.orderCreatedDate)}</OrderCardTimestamp>
        <OrderCardNeutralLink to={orderIdLink}>
          № заказа:
          <ConfigProvider theme={orangeTheme}>
            <OrderCardDocumentId copyable={{ text: items.documentId.replaceAll('-', ' ')}}>
              {items.documentId.replaceAll('-', ' ')}
            </OrderCardDocumentId>
          </ConfigProvider>
        </OrderCardNeutralLink>
      </Flex>
      <OrderCardItemsInfo vertical gap="1rem" align="flex-end">
        <OrderCardTotal to={orderIdLink}>{items.orderTotal}₽</OrderCardTotal>
        <Flex gap="1rem">
          {...(items.orderItems
            .slice(0, 4)
            .map((item, index) => (
              <OrderCardNeutralLink to={orderIdLink}>
                {index < 3
                  ? <OrderCardItemsImage src={item.thumbnail} alt="item" />
                  : <OrderCardMore>+{items.orderItems.length - 3}</OrderCardMore>
                }
              </OrderCardNeutralLink>
          )))}
        </Flex>
      </OrderCardItemsInfo>
    </OrderCardWrapper>
  );
}

export default OrderCard;
