// Components
import { Flex } from 'antd';
import Checkout from '../../components/Checkout';
import OrderButton from '../../components/OrderButton';
// Hooks
import { useTypedSelector } from '../../hooks';

const Cart: React.FC = () => {
  const { cartItemsAmount } = useTypedSelector((state) => (state.cartData));
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap="1rem"
    >
      <Checkout />
      {cartItemsAmount ? <OrderButton /> : null}
    </Flex>
  );
}

export default Cart;
