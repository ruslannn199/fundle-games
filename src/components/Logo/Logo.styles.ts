import { Flex } from 'antd';
import styled from 'styled-components';

export const LogoWrapper = styled(Flex)`
  user-select: none;
  gap: 1rem;
`;

export const LogoTitle = styled.span`
  font-family: 'Satisfy', 'Style Script', sans-serif;
  font-size: 3.2rem;
  color: var(--black-brown);
`;

export const LogoImage = styled.img`
  width: 4rem;
  height: 4rem;
`;
