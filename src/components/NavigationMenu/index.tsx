// Styles
import { Navigation, NavigationBurgerMenuButton, NavigationMenuWrapper } from './NavigationMenu.styles';
// Types
import type { MenuInfo } from 'rc-menu/lib/interface';
import { NavigationItemsLabels } from '../../types/enums';
import { useScrollBlock, useTypedSelector, useUserActions, useWindowDimensions } from '../../hooks';
import UserMenuItems from '../UserMenuItems';
import GuestMenuItems from '../GuestMenuItems';
import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import { blackTheme, orangeTheme } from '../../utils/themes';

const NavigationMenu: React.FC = () => {
  const { currentUser } = useTypedSelector((state) => (state.user));
  const [collapse, setCollapse] = useState<boolean>(true);
  const { emailSignOutStart } = useUserActions();
  const [blockScroll, allowScroll] = useScrollBlock();
  const { width } = useWindowDimensions();

  const menuSignOutAction = ({ key }: MenuInfo): void => {
    if (key === NavigationItemsLabels.LOG_OUT) emailSignOutStart();
  }

  const toggleCollapse = () => {
    if (collapse) {
      blockScroll();
    } else {
      allowScroll();
    }
    setCollapse(!collapse);
  }

  return (
    <NavigationMenuWrapper>
      <ConfigProvider theme={collapse ? blackTheme : orangeTheme}>
        <NavigationBurgerMenuButton
          onClick={toggleCollapse}
          type="primary"
        >
          {collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </NavigationBurgerMenuButton>
      </ConfigProvider>
      <Navigation
        disabledOverflow={true}
        mode={width > 768 ? "horizontal" : "inline"}
        selectable={false}
        onClick={menuSignOutAction}
        $collapsed={width > 768 ? true : collapse}
        items={currentUser
          ? UserMenuItems
          : GuestMenuItems}
      />
    </NavigationMenuWrapper>
  );
}

export default NavigationMenu;
