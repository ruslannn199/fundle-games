import { Flex } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const LogoWrapper = styled(Flex)`
  user-select: none;
  gap: 1rem;
`;

export const LogoTitle = styled.span`
  font-family: 'Satisfy', 'Style Script', sans-serif;
  font-size: 2.6rem;
  color: var(--black-brown);

  @media ${devices.sm} {
    display: none;
  }
`;

export const LogoImage = styled.img`
  width: 3.2rem;
  height: 3.2rem;
`;
