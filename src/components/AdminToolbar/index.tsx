import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks';
import { checkUserIsAdmin } from '../../utils';

const AdminToolbar: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => state.user);

  return checkUserIsAdmin(currentUser)
    ? (
    <div className="admin__toolbar">
      <Link className="admin__link" to="/admin">My admin</Link>
    </div>
    )
    : null;
};

export default AdminToolbar;
