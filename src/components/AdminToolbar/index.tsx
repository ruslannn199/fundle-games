import { Link, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks';
import { checkUserIsAdmin } from '../../utils';

const AdminToolbar: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const location = useLocation();
  const isAdminPage = location.pathname.includes('admin');

  return checkUserIsAdmin(currentUser)
    ? (
    <div className="admin__toolbar">
      <Link
        className="admin__link"
        to={isAdminPage ? '/' : '/admin'}>
        {isAdminPage ? 'Main page' : 'My admin'}
      </Link>
    </div>
    )
    : null;
};

export default AdminToolbar;
