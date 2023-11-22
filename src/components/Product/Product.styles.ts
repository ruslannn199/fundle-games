import { Flex } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

export const ProductWrapper = styled(Flex)`
  background-color: #fff;
`;

export const ProductContent = styled(Flex)`
  width: 95%;
  max-width: 150rem;
  padding: 0 10rem;

  @media ${devices.md} {
    padding: 0 5rem;
    width: 100%;
  }
`;

export const ProductHero = styled(Flex)`
  @media ${devices.lg} {
    flex-direction: column-reverse;
  }

  h1 {
    padding: 0 2rem;
  }
`;

export const ProductOfferInfo = styled(Flex)`
  max-width: 100%;
  background-color: #fff;
  padding: 2rem;
  margin: 6rem 0;
  box-shadow: 0 0 1rem rgba(0, 0, 0, .1);
  border-radius: 2rem;
  height: fit-content;

  @media ${devices.lg} {
    margin: 2rem 0;
  }

  h3 {
    margin: 0;
    font-size: 3rem;
  }

  h4 {
    margin: 0;
    font-size: 1.6rem;
  }
`;

export const ProductDescription = styled.div`
  width: 95%;
  max-width: 150rem;
  padding: 0 10rem;

  @media ${devices.md} {
    padding: 0 5rem;
    width: 100%;
  }

  p {
    width: auto;
    max-width: 120rem;
  }

  img {
    display: inline;
    max-width: 100%;
    height: auto;
  }

  a {
    color: var(--orange);

    &:hover {
      color: var(--tan);
    }
  }
`;