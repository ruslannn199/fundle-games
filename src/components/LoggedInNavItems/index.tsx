// Components
import { Link } from 'react-router-dom';
import { LogoutOutlined, EditTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import Checkout from '../Checkout';
// Images
import LogoImg from '../../assets/images/logo.png';
// Themes
import { orange } from '../../utils/themes';
// Types
import { NavigationItemsLabels } from '../../types/enums';
import type { MenuProps } from 'antd';
import CartModal from '../CartModal';

interface LoggedInNavItemsProps {
  displayName: string;
  photoURL: string | null;
  cartItemsAmount: number;
  isCartPage: boolean;
}

const LoggedInNavItems = ({
  displayName, photoURL, cartItemsAmount, isCartPage
}: LoggedInNavItemsProps): MenuProps['items'] => ([
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
      !isCartPage
        ? (
          <Popover
            placement="bottomRight"
            title="Cart"
            trigger="hover"
            content={<Checkout popup />}
            style={{ height: "64px" }}
          >
            <Link
              to="/cart"
              className="nav__profile"
              style={{
                position: "relative",
                color: "#000",
                height: "64px",
              }}
            >
              <ShoppingCartOutlined style={{ fontSize: 42, height: "64px" }} />
              { cartItemsAmount ? <CartModal itemsCounter={cartItemsAmount} /> : null }
            </Link>
          </Popover>
        )
        : (
          <div style={{ height: "64px" }}>
            <ShoppingCartOutlined style={{ fontSize: 42, height: "64px" }} />
          </div>
        )
    ),
    key: NavigationItemsLabels.CART,
  },
]);

export default LoggedInNavItems;
