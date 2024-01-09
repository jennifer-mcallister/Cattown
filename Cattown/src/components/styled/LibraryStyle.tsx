import { styled } from "styled-components";
import { bounceAnimation } from "./Animations";
import { borderRadiusSmall, smallBorder } from "./theme_variables/borders";
import { secondaryWhite } from "./theme_variables/colors";
import { devices } from "./theme_variables/devices";

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  height: 80%;
  width: 100vw;

  @media (${devices.tablet}) {
    width: 46rem;
    flex-direction: row;
    align-items: flex-start;
  }

  @media (${devices.desktop}) {
    width: 70rem;
  }
`;

export const StatsInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 10rem;
  height: 19rem;
  border: ${smallBorder};
  border-radius: ${borderRadiusSmall};
  background-color: ${secondaryWhite};
`;

export const GeneralStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 10rem;
  width: 100%;
`;

export const LibraryDivider = styled.div`
  width: 90%;
  height: 0rem;
  border-bottom: ${smallBorder};
  margin-top: 0.5rem;
`;

export const McGuffinsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  width: 17rem;
  height: auto;

  @media (${devices.tablet}) {
    grid-template-columns: 1fr 1fr;
    width: 17rem;
  }

  @media (${devices.desktop}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 35rem;
  }
`;

export const RelicsContainer = styled(McGuffinsContainer)`
  width: 12rem;
  height: auto;
  grid-template-columns: 1fr;

  @media (${devices.tablet}) {
    grid-template-columns: 1fr 1fr;
    width: 26rem;
  }

  @media (${devices.desktop}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 50rem;
  }
`;

export const RelicContainer = styled.div`
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.loaded {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${bounceAnimation} 1s ease-in-out;
  }
  display: flex;
  flex-direction: column;

  padding: 1rem;
  width: 10rem;
  height: 12rem;
  border: ${smallBorder};
  border-radius: ${borderRadiusSmall};
  background-color: ${secondaryWhite};
`;

export const RelicHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 40%;
`;

export const McGuffinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 8rem;
  height: 8rem;
  border: ${smallBorder};
  border-radius: ${borderRadiusSmall};
  background-color: ${secondaryWhite};

  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.loaded {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${bounceAnimation} 1s ease-in-out;
  }
`;

export const McGuffinImg = styled.img`
  width: 3rem;
`;

export const RelicImgContainer = styled.div`
  position: relative;
  width: 3rem;
`;

export const RelicImg = styled.img`
  width: 100%;
  position: absolute;
  top: -0.9rem;
  right: -6rem;
`;

export const TopSectionRightBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 80%;
  height: 100%;

  @media (${devices.tablet}) {
    align-items: flex-start;
  }
`;

export const InfoContainer = styled.div`
  width: 30rem;
  height: 10rem;
`;
