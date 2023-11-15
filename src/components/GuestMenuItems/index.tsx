// Components
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
// Styles
import { GuestMenuItemLink } from './GuestMenuItems.styles';
// Types
import type { MenuProps } from 'antd';
import { NavigationItemsLabels } from '../../types/enums';

const GuestMenuItems: MenuProps['items'] = [
  {
    label: (
      <GuestMenuItemLink to={`/${NavigationItemsLabels.REGISTRATION}`}>
        {NavigationItemsLabels.REGISTRATION}
      </GuestMenuItemLink>
    ),
    key: NavigationItemsLabels.REGISTRATION,
    icon: <UserAddOutlined style={{ transform: "border-color .1s .3s" }} />,
  },
  {
    label: (
      <GuestMenuItemLink to={`/${NavigationItemsLabels.LOGIN}`}>
        {NavigationItemsLabels.LOGIN}
      </GuestMenuItemLink>
    ),
    key: NavigationItemsLabels.LOGIN,
    icon: <UserOutlined style={{ transform: "border-color .1s .3s" }} />,
  },
];

export default GuestMenuItems;
