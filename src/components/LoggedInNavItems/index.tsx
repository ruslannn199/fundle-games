import { NavigationItemsLabels } from '../../types/enums';
// Images
import { LogoutOutlined } from '@ant-design/icons';
import LogoImg from '../../assets/images/logo.png';
// Firebase
import { auth } from '../../utils/firebase.utils';
// Types
import type { loggedInfo } from '../../types/types';
import type { MenuProps } from 'antd';

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
]);

export default LoggedInNavItems;
