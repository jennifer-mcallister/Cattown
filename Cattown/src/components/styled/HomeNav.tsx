import { styled } from "styled-components";
import { borderRadiusMedium, smallBorder } from "./theme_variables/borders";
import { secondaryWhite } from "./theme_variables/colors";
import { bounceAnimation } from "./Animations";

export const HomeNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 10rem;
  height: 10rem;
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
      box-shadow: 0 0 10px #f021be, 0 0 40px #f021be, 0 0 80px #f021be;
    }
  }

  background: black;
`;

export const HomeNavImg = styled.img`
  width: 20rem;
  cursor: pointer;
`;

export const HomeNavHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 0.5rem;
  border-radius: ${borderRadiusMedium};
  font-size: 2em;
  cursor: pointer;
  border: ${smallBorder};
  background-color: ${secondaryWhite};

  position: absolute;
  top: 10rem;
`;
