// Hooks
import { useAuth, useCartItems } from '../hooks'

const WithCartItems: React.FC<React.PropsWithChildren> = ({ children }) => {
  useAuth();
  useCartItems();
  return <>{children}</>;
}

export default WithCartItems;
