import { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
`;

export const NavigationWrapper = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15rem;
  background-color: #fff;
  box-shadow: 0 .2rem .4rem rgba(0, 0, 0, .1);
  margin-bottom: 1rem;
  width: 100%;

  @media ${devices.xl} {
    gap: 10rem;
  }

  @media ${devices.lg} {
    gap: 5rem;
  }
`;
