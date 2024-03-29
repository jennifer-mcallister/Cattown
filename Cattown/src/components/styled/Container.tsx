import { styled } from "styled-components";
import { secondaryWhite } from "./style_variables/colors";
import { borderRadiusMedium, mediumBorder } from "./style_variables/borders";
import { devices } from "./style_variables/devices";

interface IContainerProps {
  bgcolor?: string;
}

export const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 90vw;
  min-height: 6rem;
  margin: 0.5rem;
  padding: 1rem;
  gap: 1rem;
  background-color: ${secondaryWhite};
  border-radius: ${borderRadiusMedium};
  border: ${mediumBorder};

  @media (${devices.tablet}) {
    width: 22rem;
  }
`;

export const ConfirmationButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  width: 50%%;
  height: 50%;
  gap: 2rem;
`;

export const HomeContainerDesktop = styled.div`
  width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  padding: 3rem;

  @media (${devices.desktop}) {
    gap: 10rem;
  }
`;

export const HomeContainerMobile = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 50%;
  justify-content: center;
  align-items: center;
  gap: 6rem;
  padding: 3rem;
`;

export const PageHeaderContainer = styled.div<IContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 3rem;
  border-radius: ${borderRadiusMedium};
  background-color: ${({ bgcolor }) => (bgcolor ? bgcolor : secondaryWhite)};
  margin-top: 0.5rem;

  @media (${devices.tablet}) {
    width: 46rem;
    height: 4rem;
  }
`;
