// Components
import { Link } from 'react-router-dom';
import { LogoutOutlined, EditTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import CartItems from '../CartItems';
// Images
import LogoImg from '../../assets/images/logo.png';
import EllipseBackground from '../../assets/images/ellipse.png';
// Themes
import { orange } from '../../utils/themes';
import { CurrentUser } from '../../types/interfaces';
// Types
import { NavigationItemsLabels } from '../../types/enums';
import { Space, Button, FloatButton, Flex } from 'antd';
import type { MenuProps } from 'antd';

const LoggedInNavItems = ({ displayName, photoURL }: CurrentUser, cartItemsAmount: number): MenuProps['items'] => ([
  {
    label: (
      <h3 className="nav__profile">
        <img src={photoURL || LogoImg} alt="profile avatar" className="nav__img" />
        {displayName || "User"}
      </h3>
    ),
    key: displayName || 'placeholder',
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
      <div className="nav__profile" style={{ position: "relative" }}>
        <ShoppingCartOutlined style={{ fontSize: 42, height: '64px' }} />
        <div style={{
          backgroundImage: `url(${EllipseBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "24px",
          textAlign: "center",
          position: "absolute",
          right: "-5px",
          top: "10px",
        }}>
          {cartItemsAmount}
        </div>
      </div>
    ),
    key: NavigationItemsLabels.CART,
    children: cartItemsAmount ? CartItems : [],
  },
]);

export default LoggedInNavItems;
