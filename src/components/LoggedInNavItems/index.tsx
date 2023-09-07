import { Link } from 'react-router-dom';
import { NavigationItemsLabels } from '../../types/enums';
// Images
import { LogoutOutlined, EditTwoTone } from '@ant-design/icons';
import LogoImg from '../../assets/images/logo.png';
// Types
import type { loggedInfo } from '../../types/types';
import type { MenuProps } from 'antd';
import { orange } from '../../utils/themes';
import { emailSignOutStart } from '../../redux/User/user.action-creators';
import { CurrentUserAction } from '../../redux/User/user.actions';

const LoggedInNavItems = ({ name: displayName }: loggedInfo, callback: () => CurrentUserAction): MenuProps['items'] => ([
  {
    label: (
      <h3 className='nav__profile'>
        <img src={LogoImg} alt='profile-picture' className='nav__img' />
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
          <div className='nav__option' onClick={callback}>
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
