// Components
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// Types
import type { MenuProps } from 'antd';
import { NavigationItemsLabels } from '../../types/enums';

const GuestMenuItems: MenuProps['items'] = [
  {
    label: (
      <Link to={`/${NavigationItemsLabels.REGISTRATION}`}>
        <span style={{ textTransform: "capitalize" }}>{NavigationItemsLabels.REGISTRATION}</span>
      </Link>
    ),
    key: NavigationItemsLabels.REGISTRATION,
    icon: <UserAddOutlined style={{ transform: "border-color .1s .3s" }} />,
  },
  {
    label: (
      <Link to={`/${NavigationItemsLabels.LOGIN}`}>
        <span style={{ textTransform: "capitalize" }}>{NavigationItemsLabels.LOGIN}</span>
      </Link>
    ),
    key: NavigationItemsLabels.LOGIN,
    icon: <UserOutlined style={{ transform: "border-color .1s .3s" }} />,
  },
];

export default GuestMenuItems;
