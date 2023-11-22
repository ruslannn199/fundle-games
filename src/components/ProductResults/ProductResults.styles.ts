import { Flex, Row, Select } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const ProductResultsWrapper = styled(Flex)`
  width: 100%;
  min-height: 100vh;
`;

export const ProductResultsSelect = styled(Select)`
  width: 26rem;
  margin-bottom: 3rem;

  @media ${devices.xs} {
    width: 90%;
  }
`;

export const ProductCardRow = styled(Row)`
  padding: 0 5rem;

  @media ${devices.md} {
    padding: 0 2.5rem;
  }

  @media ${devices.sm} {
    padding: 0;
  }
`;