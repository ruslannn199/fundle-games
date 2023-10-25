import { Flex } from 'antd';
import { ProductMainData } from '../../types/interfaces';
import { OrderDetailsItemAmount, OrderDetailsItemImage, OrderDetailsItemImageLink, OrderDetailsItemInfo, OrderDetailsItemWrapper } from './OrderDetailsItem.styles';
import { FormLink } from '../../styles/Form';

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
      <Flex align="flex-end" justify="space-between">
        <OrderDetailsItemInfo vertical style={{ width: "80rem" }} gap="4rem">
          <FormLink to={`/products/${id}`}>{productName}</FormLink>
          <b>{price}₽</b>
        </OrderDetailsItemInfo>
        <Flex align="flex-end">
          <OrderDetailsItemAmount>{quantity}шт.</OrderDetailsItemAmount>
        </Flex>
      </Flex>
    </OrderDetailsItemWrapper>
  );
}

export default OrderDetailsItem;
