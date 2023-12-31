import { Button, Flex } from 'antd';
import styled from 'styled-components';
import devices from '../../styles/Devices';

interface DirectoryItemProps {
  image: string;
}

interface DirectoryTitleProps {
  color?: string;
}

export const DirectoryWrapper = styled(Flex)`
  height: 100%;

  @media ${devices.sm} {
    flex-direction: column;
  }
`;

export const DirectoryItem = styled(Flex)<DirectoryItemProps>`
  position: relative;
  color: #fff;
  width: 50%;
  height: 75vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.image});

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .3);
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  @media ${devices.sm} {
    width: 90%;
  }
`;

export const DirectoryTitle = styled.h2<DirectoryTitleProps>`
  color: ${props => props.color || '#000'};
  -webkit-text-stroke: .1rem #eee;
  font-size: 3.8rem;
  text-transform: uppercase;
  z-index: 2;

  @media ${devices.md} {
    font-size: 3rem;
  }
`;

export const DirectoryButton = styled(Button)`
  z-index: 2;
`;
