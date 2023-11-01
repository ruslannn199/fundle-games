import { Layout } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const LayoutWrapper = styled(Layout)`
  min-height: 100vh;
  padding-top: 10rem;

  @media ${devices.md} {
    padding: 10rem 0 5rem;
  }
`;