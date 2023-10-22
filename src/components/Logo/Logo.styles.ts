import { Flex } from 'antd';
import styled from 'styled-components';

export const LogoWrapper = styled(Flex)`
  user-select: none;
  gap: .5rem;
`;

export const LogoTitle = styled.span`
  font-family: 'Satisfy', 'Style Script', sans-serif;
  font-size: 2.6rem;
  color: var(--black-brown);
`;

export const LogoImage = styled.img`
  width: 3.2rem;
  height: 3.2rem;
`;
