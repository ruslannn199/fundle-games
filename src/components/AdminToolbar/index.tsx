// Hooks
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks';
// Styles
import { AdminToolbarWrapper, AdminToolbarLink } from './AdminToolbar.styles';
// Utils
import { checkUserIsAdmin } from '../../utils';

const AdminToolbar: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const location = useLocation();
  const isAdminPage = location.pathname.includes('admin');

  return checkUserIsAdmin(currentUser)
    ? (
    <AdminToolbarWrapper justify="flex-end">
      <AdminToolbarLink
        to={isAdminPage ? "/" : "/admin"}>
        {isAdminPage ? "Main page" : "My admin"}
      </AdminToolbarLink>
    </AdminToolbarWrapper>
    )
    : null;
};

export default AdminToolbar;
