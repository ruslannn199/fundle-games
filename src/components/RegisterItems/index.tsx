// Components
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// Types
import type { MenuProps } from 'antd';
import { NavigationItemsLabels } from '../../types/enums';

const RegisterItems: MenuProps['items'] = [
  {
    label: (
      <Link to={`/${NavigationItemsLabels.REGISTRATION}`} className='nav__link'>
        <span className="nav__link-text">{NavigationItemsLabels.REGISTRATION}</span>
      </Link>
    ),
    key: NavigationItemsLabels.REGISTRATION,
    icon: <UserAddOutlined className='nav__icon' />,
  },
  {
    label: (
      <Link to={`/${NavigationItemsLabels.LOGIN}`} className='nav__link'>
        <span className='nav__link-text'>{NavigationItemsLabels.LOGIN}</span>
      </Link>
    ),
    key: NavigationItemsLabels.LOGIN,
    icon: <UserOutlined className='nav__icon' />,
  },
];

export default RegisterItems;
