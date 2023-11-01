import { Flex } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const DashboardWrapper = styled(Flex)`
  gap: 6rem;
  padding: 5rem 0;

  @media ${devices.md} {
    gap: 5rem;
  }

  @media ${devices.sm} {
    gap: 3.5rem;
  }
`;
