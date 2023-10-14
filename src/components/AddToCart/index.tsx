import { Button, ConfigProvider } from 'antd';
import { blackTheme } from '../../utils/themes';
import type { ProductData } from '../../types/interfaces';
import { useCartActions } from '../../hooks/useActions';

const AddToCart: React.FC<Record<'product', ProductData>> = ({ product }) => {
  const { addToCart } = useCartActions();

  const handleAddToCart = (product?: ProductData) => {
    if (product) {
      addToCart(product);
    }
  }

  return (
    <ConfigProvider theme={blackTheme}>
      <Button
        type="primary"
        onClick={() => handleAddToCart(product)}
      >
        Add to Cart
      </Button>
    </ConfigProvider>
  );
}

export default AddToCart;
