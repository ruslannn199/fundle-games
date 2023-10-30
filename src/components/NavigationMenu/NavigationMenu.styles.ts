import { Button, Menu } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

interface NavigationProps {
  $collapsed?: boolean;
}

export const NavigationMenuWrapper = styled.div`
  @media ${devices.md} {
  }
`;

export const Navigation = styled(Menu)<NavigationProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;

  @media ${devices.md} {
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    width: 32rem;
    transform: translateX(${({ $collapsed }) => ($collapsed ? '100%' : '0%')});
    flex-direction: column;
    transition: .3s;
  }
`;

export const NavigationBurgerMenuButton = styled(Button)`
  display: none;

  @media ${devices.md} {
    display: block;
    z-index: 4;
  }
`;
