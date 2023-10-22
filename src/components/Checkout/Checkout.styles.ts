import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
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

export const CheckoutButton = styled(Button)`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

export const CheckoutMinusIcon = styled(MinusCircleOutlined)`
  image {
    font-size: 1rem;
  }
`;
