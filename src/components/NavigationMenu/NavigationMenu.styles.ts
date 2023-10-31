import { Button, Menu } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

interface NavigationProps {
  $collapsed?: boolean;
}

export const Navigation = styled(Menu)<NavigationProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;

  @media ${devices.md} {
    display: none;
  }
`;

export const NavigationBurgerMenuButton = styled(Button)`
  display: none;

  @media ${devices.md} {
    display: block;
    z-index: 4;
  }
`;
