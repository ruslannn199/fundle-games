import { Link } from 'react-router-dom';
import { NavigationItemsLabels } from '../../types/enums';
// Images
import { DashboardOutlined, LogoutOutlined, EditTwoTone } from '@ant-design/icons';
import LogoImg from '../../assets/images/logo.png';
// Firebase
import { auth } from '../../utils/firebase.utils';
// Types
import type { loggedInfo } from '../../types/types';
import type { MenuProps } from 'antd';
import { orange } from '../../utils/themes';

const LoggedInNavItems = ({ photo: photoURL, name: displayName }: loggedInfo): MenuProps['items'] => ([
  {
    label: (
      <h3 className='nav__profile'>
        <img src={photoURL || LogoImg} alt='profile-picture' className='nav__img' />
        {displayName || 'User'}
      </h3>
    ),
    key: displayName || 'placeholder',
    children: [
      {
        label: (
          <div className='nav__option' onClick={() => auth.signOut()}>
            <span>{NavigationItemsLabels.LOG_OUT}</span>
            <LogoutOutlined />
          </div>
        ),
        key: NavigationItemsLabels.LOG_OUT,
      }
    ]
  },
  {
    label: (
      <Link to={`/${NavigationItemsLabels.DASHBOARD}`} className='nav__link'>
        <span className='nav__link-text'>My Account</span>
      </Link>
    ),
    key: NavigationItemsLabels.DASHBOARD,
    icon: <EditTwoTone twoToneColor={orange} className='nav__icon' />,
  }
]);

export default LoggedInNavItems;
