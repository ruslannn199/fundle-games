// Components
import { Link } from 'react-router-dom';
import { LogoutOutlined, EditTwoTone } from '@ant-design/icons';
import UserDropdown from '../UserDropdown';
import CartPopup from '../CartPopup';
import { Flex } from 'antd';
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
          <Link to={`/${NavigationItemsLabels.DASHBOARD}`}>
            <Flex justify="center" align="center">
              <EditTwoTone twoToneColor={orange} />
              <span>My Account</span>
            </Flex>
          </Link>
        ),
        key: NavigationItemsLabels.DASHBOARD,
      },
      {
        label: (
          <Flex justify="center" align="center" gap="1rem">
            <span>{NavigationItemsLabels.LOG_OUT}</span>
            <LogoutOutlined />
          </Flex>
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
