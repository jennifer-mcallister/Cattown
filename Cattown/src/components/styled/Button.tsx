import { styled } from "styled-components";
import {
  borderRadiusMedium,
  borderRadiusRoundSmall,
  smallBorder,
} from "./theme_variables/borders";
import { primaryPink, secondaryPink } from "./theme_variables/colors";

interface IButtonProps {
  bgcolor?: string;
}

export const ButtonMedium = styled.button<IButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: ${borderRadiusMedium};
  font-size: 1.5rem;
  cursor: pointer;
  border: ${smallBorder};
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : secondaryPink)};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  &:enabled:active {
    transform: scale(0.9);
  }

  &:disabled {
    background-color: #d4d4d4;
    color: #8f8f8f;
  }
`;

export const ButtonLarge = styled.button<IButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 18rem;
  height: 3.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 0.5rem;
  border-radius: ${borderRadiusMedium};
  font-size: 2em;
  cursor: pointer;
  border: ${smallBorder};
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : secondaryPink)};
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:focus {
    background-color: ${primaryPink};
  }

  &:enabled:active {
    transform: scale(0.9);
  }

  &:disabled {
    background-color: #d4d4d4;
    color: #8f8f8f;
  }
`;

export const ButtonLargeSelect = styled(ButtonLarge)`
  gap: 2rem;
  background-color: ${secondaryPink};
  &:focus {
    background-color: ${primaryPink};
  }
`;

export const ButtonIcon = styled(ButtonMedium)`
  height: 3.5rem;
  width: 3.5rem;
  border-radius: ${borderRadiusRoundSmall};
  transition: transform 0.1s ease-in-out;

  &:focus {
    background-color: ${primaryPink};
  }

  &:hover {
    transform: scale(1.1);
  }

  &:enabled:active {
    transform: scale(0.9);
  }
`;
