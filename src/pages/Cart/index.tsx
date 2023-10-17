import { Flex } from 'antd';
import Checkout from '../../components/Checkout';
import OrderButton from '../../components/OrderButton';
import { useTypedSelector } from '../../hooks';
import WithCartItems from '../../hoc/withCartItems';

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
