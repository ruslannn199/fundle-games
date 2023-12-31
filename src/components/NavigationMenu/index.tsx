// Components
import UserMenuItems from '../UserMenuItems';
import GuestMenuItems from '../GuestMenuItems';
// Hooks
import { useTypedSelector, useUserActions } from '../../hooks';
// Styles
import { Navigation } from './NavigationMenu.styles';
// Types
import type { MenuInfo } from 'rc-menu/lib/interface';
import { NavigationItemsLabels } from '../../types/enums';

const NavigationMenu: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const { emailSignOutStart } = useUserActions();

  const menuSignOutAction = ({ key }: MenuInfo): void => {
    if (key === NavigationItemsLabels.LOG_OUT) emailSignOutStart();
  }

  return (
    <Navigation
      disabledOverflow={true}
      mode="horizontal"
      selectable={false}
      onClick={menuSignOutAction}
      items={currentUser
        ? UserMenuItems
        : GuestMenuItems}
    />
  );
}

export default NavigationMenu;
