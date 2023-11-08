import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import styled from 'styled-components';

export const SpinnerWrapper = styled(Spin)`
  background-color: #fff;
  min-height: calc(100vh - 9.38rem);
`;

export const SpinnerIndicator = styled(LoadingOutlined)`
  font-size: 4.8rem;
  color: var(--orange);
`;

export const SpinnerDot = styled.span`
  display: inline-block;
  animation: bouncing 800ms infinite ease-in-out;

  &:nth-child(2) {
    animation-delay: 125ms;
  }

  &:nth-child(3) {
    animation-delay: 250ms;
  }

  @keyframes bouncing {
    0% {
      transform: none;
    }

    33% {
      transform: translateY(-.4rem);
    }

    66% {
      transform: none;
    }
  }
`;
