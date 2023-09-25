// Components
import { Link } from 'react-router-dom';
import { LogoutOutlined, EditTwoTone } from '@ant-design/icons';
// Images
import LogoImg from '../../assets/images/logo.png';
// Themes
import { orange } from '../../utils/themes';
import { CurrentUser } from '../../types/interfaces';
// Types
import { NavigationItemsLabels } from '../../types/enums';
import type { MenuProps } from 'antd';

const LoggedInNavItems = ({ displayName, photoURL }: CurrentUser): MenuProps['items'] => ([
  {
    label: (
      <h3 className='nav__profile'>
        <img src={photoURL || LogoImg} alt='profile avatar' className='nav__img' />
        {displayName || 'User'}
      </h3>
    ),
    key: displayName || 'placeholder',
    children: [
      {
        label: (
          <Link to={`/${NavigationItemsLabels.DASHBOARD}`} className='nav__option'>
            <EditTwoTone twoToneColor={orange} />
            <span>My Account</span>
          </Link>
        ),
        key: NavigationItemsLabels.DASHBOARD,
      },
      {
        label: (
          <div className='nav__option'>
            <span>{NavigationItemsLabels.LOG_OUT}</span>
            <LogoutOutlined />
          </div>
        ),
        key: NavigationItemsLabels.LOG_OUT,
      },
    ]
  },
]);

export default LoggedInNavItems;
