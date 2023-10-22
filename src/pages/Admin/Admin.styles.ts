import { Flex, Menu } from 'antd';
import styled from 'styled-components'

export const AdminWrapper = styled(Flex)`
  width: 188rem;
  padding: 1rem;
  gap: 1rem;
`;

export const AdminMenu = styled(Menu)`
  width: 32rem;
`;

export const AdminDashboard = styled(Flex)`
  max-width: 150rem;
  padding: 1rem;
`;

export const AdminDisplayName = styled.span`
  text-align: center;
  font-size: 2rem;
`;
