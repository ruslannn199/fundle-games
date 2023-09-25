// Hooks
import { useAuth } from '../hooks';

const WithAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
  useAuth();
  return <>{children}</>;
};

export default WithAuth;
