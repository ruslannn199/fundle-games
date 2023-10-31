import { LogoutOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import styled from 'styled-components';

export const NavigationMenuMobileWrapper = styled(Flex)`
  position: fixed;
  bottom: 0;
  box-shadow: 0 .4rem 2rem rgba(0, 0, 0, .1);
  width: 100%;
  padding: .8rem 1.6rem;
  background-color: #fff;
  height: 5rem;
  z-index: 5;
`;

export const NavigationMenuMobileImage = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
`;

export const NavigationMenuMobileLogout = styled(LogoutOutlined)`
  color: var(--orange);
  font-size: 3.2rem;

  &:hover,
  &:active {
    color: var(--tan);
  }
`;
