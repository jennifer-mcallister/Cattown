import { styled } from "styled-components";
import { secondaryPink, secondaryWhite } from "./theme_variables/colors";
import {
  borderRadiusMedium,
  mediumBorder,
  smallBorder,
} from "./theme_variables/borders";

interface IContainerProps {
  bgColor?: string;
}

export const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20rem;
  min-height: 6rem;
  padding: 2rem;
  background-color: ${secondaryPink};
  border-radius: ${borderRadiusMedium};
  border: ${mediumBorder};
`;

export const ConfirmationButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 50%%;
  height: 50%;
`;

export const HomeContainer = styled.div`
  width: 80%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  padding: 3rem;
`;

export const PageHeaderContainer = styled.div<IContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50rem;
  height: 4rem;
  border: ${smallBorder};
  border-radius: ${borderRadiusMedium};
  background-color: ${({ bgColor }) => (bgColor ? bgColor : secondaryWhite)};
`;
