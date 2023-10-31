import { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
`;

export const NavigationWrapper = styled(Header)`
  background-color: #fff;
  box-shadow: 0 .2rem .4rem rgba(0, 0, 0, .1);
  margin-bottom: 1rem;
  width: 100%;
`;
