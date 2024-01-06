import { styled } from "styled-components";
import { bounceAnimation } from "./Animations";
import { borderRadiusMedium, smallBorder } from "./theme_variables/borders";
import { secondaryWhite } from "./theme_variables/colors";

export const MapOverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
  width: 42rem;
  height: 32rem;
`;

export const MapOverviewLocation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 15rem;
  position: relative;

  cursor: pointer;

  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.loaded {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${bounceAnimation} 1s ease-in-out;
  }

  &: hover {
    width: 20.5rem;
  }
`;

export const MapOverviewImg = styled.img`
  width: 110%;
  position: relative;
`;

export const MapHoverContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 6rem;
  height: 5rem;
  border-radius: ${borderRadiusMedium};
  border: ${smallBorder};
  background: ${secondaryWhite};
  position: absolute;
  top: 0;
  pointer-events: none;
`;
