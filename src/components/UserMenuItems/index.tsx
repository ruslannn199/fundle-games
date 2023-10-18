// Components
import { Link } from 'react-router-dom';
import { LogoutOutlined, EditTwoTone } from '@ant-design/icons';
import UserDropdown from '../UserDropdown';
import CartPopup from '../CartPopup';
// Themes
import { orange } from '../../utils/themes';
// Types
import { NavigationItemsLabels } from '../../types/enums';
import type { MenuProps } from 'antd';

const UserMenuItems: MenuProps['items'] = [
  {
    label: (
      <UserDropdown />
    ),
    key: "User dropdown",
    children: [
      {
        label: (
          <Link to={`/${NavigationItemsLabels.DASHBOARD}`} className="nav__option">
            <EditTwoTone twoToneColor={orange} />
            <span>My Account</span>
          </Link>
        ),
        key: NavigationItemsLabels.DASHBOARD,
      },
      {
        label: (
          <div className="nav__option">
            <span>{NavigationItemsLabels.LOG_OUT}</span>
            <LogoutOutlined />
          </div>
        ),
        key: NavigationItemsLabels.LOG_OUT,
      },
    ]
  },
  {
    label: (
      <CartPopup />
    ),
    key: NavigationItemsLabels.CART,
  },
];

export default UserMenuItems;
