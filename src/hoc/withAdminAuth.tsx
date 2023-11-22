// Hooks
import { useAdminAuth } from '../hooks';

const WithAdminAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
  useAdminAuth();
  return <>{children}</>;
};

export default WithAdminAuth;
