import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const AdminToolbarWrapper = styled(Flex)`
  width: 100%;
  background-color: #000;
  margin: 0 auto;
  padding: .5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 3;
`;

export const AdminToolbarLink = styled(Link)`
  color: var(--beige);

  &:hover,
  &:active {
    color: var(--orange);
  }
`;
