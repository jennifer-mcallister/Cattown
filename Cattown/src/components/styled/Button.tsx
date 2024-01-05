import { styled } from "styled-components";
import { borderRadiusMedium, smallBorder } from "./theme_variables/borders";
import { primaryYellow, secondaryPink } from "./theme_variables/colors";

interface IButtonProps {
  bgColor?: string;
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
  margin-top: 0.5rem;
  border-radius: ${borderRadiusMedium};
  font-size: 1.5rem;
  cursor: pointer;
  border: ${smallBorder};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : secondaryPink)};

  &:hover {
    filter: brightness(120%);
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
  width: 20rem;
  height: 3.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 0.5rem;
  border-radius: ${borderRadiusMedium};
  font-size: 2em;
  cursor: pointer;
  border: ${smallBorder};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : secondaryPink)};

  &:hover {
    background-color: ${({ bgColor }) => (bgColor ? bgColor : "#ffd5d5")};
  }

  &:disabled {
    background-color: #d4d4d4;
    color: #8f8f8f;
  }
`;

export const ButtonLargeSelect = styled(ButtonLarge)<IButtonProps>`
  background-color: ${({ bgColor }) => (bgColor ? bgColor : secondaryPink)};
  &:focus {
    background-color: ${primaryYellow};
  }
`;
