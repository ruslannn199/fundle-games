import { Flex } from 'antd';
import { ProductData } from '../../types/interfaces';
import {
  CheckoutItemCounter,
  CheckoutItemPrice,
  CheckoutItemText,
  CheckoutItemThumbnail,
  CheckoutItemTitle,
  CheckoutItemTrashcan,
  CheckoutItemWrapper
} from './CheckoutItem.styles';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useCartActions } from '../../hooks/useActions';
import Trashcan from '/images/trashcan.svg';
import TrashcanHovered from '/images/trashcan-hover.svg';
import { useState } from 'react';
import { useWindowDimensions } from '../../hooks';

interface CheckoutItemProps extends React.RefAttributes<HTMLElement> {
  productData: ProductData;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({
  productData: { id, thumbnail, productName, quantity, price }
}) => {
  const [hoverTrashcan, setHoverTrashcan] = useState<boolean>(false);
  const { appendCartItem, removeCartItem, reduceCartItem } = useCartActions();
  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  const handleMouseEnterOnTrashcan = () => {
    setHoverTrashcan(true);
  }

  const handleMouseLeaveOnTrashcan = () => {
    setHoverTrashcan(false);
  }

  const handleDecrease = (id: string, quantity: number) => {
    if (quantity === 1) {
      removeCartItem(id);
    } else {
      reduceCartItem(id);
    }
  }

  return (
    <CheckoutItemWrapper
      vertical={isMobile}
      align={isMobile ? "flex-start" : "center"}
      justify={isMobile ? "center" : "space-between" }
      gap={isMobile ? "2rem" : "0"}
    >
      <CheckoutItemTitle to={`/products/${id}`}>
        <CheckoutItemThumbnail src={thumbnail} alt="product" />
        {productName}
      </CheckoutItemTitle>
      <Flex vertical justify="center" align="flex-end" style={{ position: "relative" }}>
        <CheckoutItemCounter justify="center" align="center" gap="1rem">
          <MinusCircleOutlined onClick={() => handleDecrease(id, quantity)} />
          {quantity}
          <PlusCircleOutlined onClick={() => appendCartItem(id) } />
        </CheckoutItemCounter>
        <CheckoutItemText>{price}₽/шт.</CheckoutItemText>
      </Flex>
      <Flex
        align="center"
        justify={isMobile ? "space-between" : "flex-end"}
        gap="2rem"
        style={{ width: isMobile ? "100%" : "10rem" }}
      >
        <CheckoutItemPrice>{price * quantity}₽</CheckoutItemPrice>
        <CheckoutItemTrashcan
          src={hoverTrashcan ? TrashcanHovered : Trashcan}
          alt="trashcan"
          onMouseEnter={handleMouseEnterOnTrashcan}
          onMouseLeave={handleMouseLeaveOnTrashcan}
          onClick={() => removeCartItem(id)}
        />
      </Flex>
    </CheckoutItemWrapper>
  );
}

export default CheckoutItem;
