import { Button, Input } from 'antd';
import Title from 'antd/es/typography/Title';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import devices from './Devices';

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

export const FormInput = styled(Input)`
  width: 50rem;

  @media ${devices.md} {
    width: 40rem;
  }

  @media ${devices.sm} {
    width: 30rem;
  }
`;
