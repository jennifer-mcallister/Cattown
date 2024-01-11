import { styled } from "styled-components";
import { borderRadiusMedium, smallBorder } from "./theme_variables/borders";
import { secondaryWhite } from "./theme_variables/colors";
import { bounceAnimation } from "./Animations";
import { devices } from "./theme_variables/devices";

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
    &:hover {
      box-shadow: ${({ hovercolor }) =>
        hovercolor
          ? ` 0 0 200px ${hovercolor}, 0 0 40px ${hovercolor}, 0 0 80px ${hovercolor}`
          : " 0 0 10px #f021be, 0 0 70px #f021be, 0 0 80px #f021be"};
    }

    @media (${devices.tablet}) {
      width: 10rem;
      height: 10rem;
    }
  }
`;

export const HomeNavImg = styled.img`
  width: 15rem;
  cursor: pointer;
  &:hover {
    width: 10.5rem;
  }

  @media (${devices.tablet}) {
    width: 20rem;

    &:hover {
      width: 20.5rem;
    }
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
