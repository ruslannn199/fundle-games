import { useTypedSelector, useUserActions, useWindowDimensions } from '../../hooks';
import { NavigationMenuMobileImage, NavigationMenuMobileButton, NavigationMenuMobileWrapper } from './NavigationMenuMobile.styles';
import LogoImg from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { NavigationItemsLabels } from '../../types/enums';
import CartPopup from '../CartPopup';
import { LogoutOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';

const NavigationMenuMobile: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { width } = useWindowDimensions();
  const { emailSignOutStart } = useUserActions();

  const isMobile = width < 768;

  return isMobile
    ? (
      currentUser
        ? (
          <NavigationMenuMobileWrapper align="center" justify="space-around">
            <Link to={`/${NavigationItemsLabels.DASHBOARD}`}>
              <NavigationMenuMobileImage src={LogoImg} alt="profile avatar" />
            </Link>
            <CartPopup />
            <NavigationMenuMobileButton
              type="text"
              icon={<LogoutOutlined />}
              onClick={() => emailSignOutStart()}
            />
          </NavigationMenuMobileWrapper>
        )
        : (
          <NavigationMenuMobileWrapper align="center" justify="space-around">
            <Link to={`/${NavigationItemsLabels.REGISTRATION}`}>
              <NavigationMenuMobileButton
                type="text"
                icon={<UserAddOutlined style={{ transform: "border-color .1s .3s" }} />}
              />
            </Link>
            <CartPopup />
            <Link to={`/${NavigationItemsLabels.LOGIN}`}>
              <NavigationMenuMobileButton
                type="text"
                icon={<UserOutlined style={{ transform: "border-color .1s .3s" }} />}
              />
            </Link>
          </NavigationMenuMobileWrapper>
        )
    )
    : null;
}

export default NavigationMenuMobile;
