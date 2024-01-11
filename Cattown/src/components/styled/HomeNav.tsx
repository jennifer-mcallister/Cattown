import { styled } from "styled-components";
import { borderRadiusMedium, smallBorder } from "./style_variables/borders";
import { secondaryWhite } from "./style_variables/colors";
import { bounceAnimation } from "./Animations";
import { devices } from "./style_variables/devices";

interface IHomeNavProps {
  hovercolor: string;
}

export const HomeNavContainer = styled.div<IHomeNavProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 5rem;
  height: 5rem;
  position: relative;
  border-radius: 10rem;

  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.loaded {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${bounceAnimation} 1s ease-in-out;

    @media (${devices.tablet}) {
      width: 10rem;
      height: 10rem;
    }
  }
`;

export const HomeNavImg = styled.img`
  width: 15rem;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  &:enabled:active {
    transform: scale(0.9);
  }

  @media (${devices.tablet}) {
    width: 20rem;
  }
`;

export const HomeNavHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 0.5rem;
  border-radius: ${borderRadiusMedium};
  font-size: 2em;
  cursor: pointer;
  border: ${smallBorder};
  background-color: ${secondaryWhite};

  position: absolute;
  top: 4.5rem;

  @media (${devices.tablet}) {
    top: 10rem;
    width: 8rem;
    height: 3rem;
  }
`;

export const HomeInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  max-width: 70vw;
  min-height: 20rem;
  text-align: center;
  border: ${smallBorder};
  background-color: ${secondaryWhite};
  border-radius: ${borderRadiusMedium};

  @media (${devices.tablet}) {
    width: 30rem;
  }
`;
