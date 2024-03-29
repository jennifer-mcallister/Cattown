import { keyframes } from "styled-components";

export const bounceAnimation = keyframes`
  0% {
    transform: scale(0.5);
  }
  20% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(0.9);
  }
  80% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
`;

export const buyRelicAnimation = keyframes`
  100% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.01);
  }
  50% {
    transform: scale(0.9);
  }
  20% {
    transform: scale(1.1);
  }
  0% {
    transform: scale(0.5);
  }
`;
