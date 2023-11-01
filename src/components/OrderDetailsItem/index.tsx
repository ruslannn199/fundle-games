import { Flex } from 'antd';
import { ProductMainData } from '../../types/interfaces';
import {
  OrderDetailsItemAmount,
  OrderDetailsItemBold,
  OrderDetailsItemImage,
  OrderDetailsItemImageLink,
  OrderDetailsItemInfo,
  OrderDetailsItemLink,
  OrderDetailsItemWrapper
} from './OrderDetailsItem.styles';

interface OrderDetailsItemProps extends React.RefAttributes<HTMLDivElement> {
  item: ProductMainData;
}

const OrderDetailsItem: React.FC<OrderDetailsItemProps> = ({
  item: { thumbnail, productName, price, quantity, id }
}) => {
  return (
    <OrderDetailsItemWrapper gap="2rem">
      <OrderDetailsItemImageLink to={`/products/${id}`}>
        <OrderDetailsItemImage src={thumbnail} alt={productName} />
      </OrderDetailsItemImageLink>
      <Flex align="flex-end" justify="space-between" style={{ width: "100%" }}>
        <OrderDetailsItemInfo vertical>
          <OrderDetailsItemLink to={`/products/${id}`}>{productName}</OrderDetailsItemLink>
          <OrderDetailsItemBold>{price}₽</OrderDetailsItemBold>
        </OrderDetailsItemInfo>
        <Flex align="flex-end">
          <OrderDetailsItemAmount>{quantity}шт.</OrderDetailsItemAmount>
        </Flex>
      </Flex>
    </OrderDetailsItemWrapper>
  );
}

export default OrderDetailsItem;
