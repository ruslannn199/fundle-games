// Components
import { Link } from 'react-router-dom';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
// Types
import type { MenuProps } from 'antd';
import { AdminItemsLabels } from '../../types/enums';
import type { CurrentUser } from '../../types/interfaces';
import AddNewProduct from '../AddNewProduct';

const AdminNavItems = ({ displayName }: CurrentUser): MenuProps['items'] => ([
  {
    label: displayName,
    key: AdminItemsLabels.INFO,
    icon: <UserOutlined />,
  },
  {
    label: (
      <Link to="/admin">{AdminItemsLabels.HOME}</Link>
    ),
    key: AdminItemsLabels.HOME,
    icon: <HomeOutlined />,
  },
  {
    label: AdminItemsLabels.SIGN_OUT,
    key: AdminItemsLabels.SIGN_OUT,
    icon: <LogoutOutlined />,
  },
  {
    label: <AddNewProduct />,
    key: AdminItemsLabels.ADD_NEW_PRODUCT,
  }
]);

export default AdminNavItems;
