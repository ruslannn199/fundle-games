import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';

const NavigationItems: MenuProps['items'] = [
  {
    label: (
      <Link to='/registration' className='nav__link'>
        <span className="nav__link-text">Registration</span>
      </Link>
    ),
    key: 'registration',
    icon: <UserOutlined />,
  }
];

export default NavigationItems;
