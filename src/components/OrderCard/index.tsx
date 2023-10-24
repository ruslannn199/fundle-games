import { Flex } from 'antd';
import { Order } from '../../types/interfaces';
import { OrderCardItemsImage, OrderCardItemsInfo, OrderCardMore, OrderCardWrapper } from './OrderCart.styles';
import { Link } from 'react-router-dom';

interface OrderCardProps extends React.RefAttributes<HTMLDivElement> {
  items: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ items }) => {
  return (
    <OrderCardWrapper
      align="center"
      justify="space-between"
      gap="5rem"
    >
      <Flex vertical gap="1rem" justify="flex-start" align="flex-start">
        <h3>Заказ от {items.orderCreatedDate}</h3>
      </Flex>
      <OrderCardItemsInfo vertical gap="1rem" align="flex-end">
        <h3>{items.orderTotal}₽</h3>
        <Flex gap="1rem">
          {...(items.orderItems
            .slice(0, 4)
            .map((item, index) => (
              index < 3
                ? <Link to={`/products/${item.id}`}>
                    <OrderCardItemsImage src={item.thumbnail} alt="item" />
                  </Link>
                : <OrderCardMore>+{items.orderItems.length - 3}</OrderCardMore>
          )))}
        </Flex>
      </OrderCardItemsInfo>
    </OrderCardWrapper>
  );
}

export default OrderCard;
