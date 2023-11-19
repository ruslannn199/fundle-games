import styled from 'styled-components';
import devices from '../../styles/Devices';
import CreditCardInput from '.';

export const CreditCardField = styled(CreditCardInput)`
  width: 15rem;

  @media ${devices.sm} {
    width: 10rem;
  }
`;

export const CreditCardExpiry = styled(CreditCardInput)`
  width: 9rem;

  @media ${devices.sm} {
    width: 5rem;
  }
`;

export const CreditCardCVC = styled(CreditCardInput)`
  width: 5rem;

  @media ${devices.sm} {
    width: 4rem;
  }
`;