import { useTypedSelector, useWindowDimensions } from '../../hooks';
import { NavigationMenuMobileImage, NavigationMenuMobileLogout, NavigationMenuMobileWrapper } from './NavigationMenuMobile.styles';
import LogoImg from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { NavigationItemsLabels } from '../../types/enums';
import CartPopup from '../CartPopup';

const NavigationMenuMobile: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return isMobile
    ? (
      currentUser
        ? (
          <NavigationMenuMobileWrapper align="center" justify="space-around">
            <Link to={`/${NavigationItemsLabels.DASHBOARD}`}>
              <NavigationMenuMobileImage src={LogoImg} alt="profile avatar" />
            </Link>
            <Link to={`/${NavigationItemsLabels.CART}`}>
              <CartPopup />
            </Link>
            <Link to={`/${NavigationItemsLabels.LOG_OUT}`}>
              <NavigationMenuMobileLogout />
            </Link>
          </NavigationMenuMobileWrapper>
        )
        : (
          <NavigationMenuMobileWrapper align="center" justify="space-around">
            <div />
          </NavigationMenuMobileWrapper>
        )
    )
    : null;
}

export default NavigationMenuMobile;
