import { Layout } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const LayoutWrapper = styled(Layout)`
  min-height: 100vh;
  padding-top: 8rem;

  @media ${devices.md} {
    padding: 8rem 0 5rem;
  }
`;