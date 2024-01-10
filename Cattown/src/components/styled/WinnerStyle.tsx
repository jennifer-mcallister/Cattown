import { styled } from "styled-components";
import { bounceAnimation } from "./Animations";
import { HeaderBig } from "./Text";
import { primaryWhite } from "./theme_variables/colors";
import { devices } from "./theme_variables/devices";

export const WinnerImg = styled.img`
  width: 90vw;

  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.loaded {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${bounceAnimation} 1s ease-in-out;
  }

  @media (${devices.desktop}) {
    width: 30rem;
  }
`;

export const WinnerTitle = styled(HeaderBig)`
  color: ${primaryWhite};
`;

export const WinnerSubTitle = styled(WinnerTitle)`
  font-size: 1.5rem;
`;
