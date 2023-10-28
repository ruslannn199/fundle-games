import { Table } from 'antd';
import styled from 'styled-components';

const { Summary: { Row, Cell } } = Table;

export const CheckoutTable = styled(Table)`
  table {
    font-size: 2rem;
  }
`;

export const CheckoutRow = styled(Row)`
`;

export const CheckoutCell = styled(Cell)`
  font-size: 2rem;
  font-weight: bold;
`;
