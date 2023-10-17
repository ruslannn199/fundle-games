import { useCartItems } from '../hooks'

const WithCartItems: React.FC<React.PropsWithChildren> = ({ children }) => {
  useCartItems();
  return <>{children}</>;
}

export default WithCartItems;
