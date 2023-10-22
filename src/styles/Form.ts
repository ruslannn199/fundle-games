import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FormTitle = styled(Title)`
  text-align: center;
  text-transform: uppercase;
`;

export const FormButton = styled(Button)`
  margin-right: .8rem;
`;

export const FormLink = styled(Link)`
  color: var(--orange);

  &:hover {
    color: var(--tan);
  }
`;
