import { styled } from "styled-components";
import { borderRadiusSmall, smallBorder } from "./theme_variables/borders";
import { primaryGreen, secondaryGreen } from "./theme_variables/colors";

interface IProgressBar {
  progress: number;
}

export const ProgressBarContainer = styled.div`
  width: 12rem;
  height: 1.5rem;
  position: relative;

  background: ${secondaryGreen};
  border: ${smallBorder};
  border-radius: ${borderRadiusSmall};
`;

export const ProgressBarFill = styled(ProgressBarContainer)<IProgressBar>`
  width: ${({ progress }) => (progress ? `${progress}%` : "0%")};
  background-color: ${primaryGreen};
  border: ${smallBorder};
  border-radius: ${borderRadiusSmall};
  padding-left: 0.5rem;
  top: -2px;
  left: -2px;
  display: flex;
  align-items: center;
`;

export const ProgressBarNextLevel = styled.p`
  font-family: "Comic Neue", cursive;
`;