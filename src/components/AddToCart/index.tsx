// Components
import { Button, ConfigProvider } from 'antd';
// Hooks
import { useCartActions } from '../../hooks/useActions';
// Themes
import { blackTheme } from '../../utils/themes';
// Types
import type { ProductData } from '../../types/interfaces';

interface AddToCartProps {
  product: ProductData;
}

const AddToCart: React.FC<AddToCartProps> = ({ product }) => {
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
        Купить
      </Button>
    </ConfigProvider>
  );
}

export default AddToCart;
