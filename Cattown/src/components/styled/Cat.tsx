import { styled } from "styled-components";
import { black, secondaryWhite } from "./theme_variables/colors";
import { borderRadiusMedium, smallBorder } from "./theme_variables/borders";
import { bounceAnimation } from "./Animations";

export const CatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 18rem;
  height: 17.5rem;
  padding: 0.5rem;
  border-radius: ${borderRadiusMedium};
  border: ${smallBorder};
  background: ${secondaryWhite};

  opacity: 0;
  transform: scale(0.5);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  &.loaded {
    opacity: 1;
    transform: translateY(0) scale(1);
    animation: ${bounceAnimation} 1s ease-in-out;
  }
`;

export const NoCatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 20%;
`;

export const CatHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 5.5rem;
  width: 90%;
`;

export const CatHeaderTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 70%;
`;

export const CatContent = styled(CatHeader)`
  flex-direction: row;
  align-items: center;
`;

export const CatFooter = styled(CatContent)``;

export const CatContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 46%;
`;

export const CatTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1.5rem;
  width: 90%;
`;

export const CatDivider = styled.div`
  width: 7rem;
  height: 0.1rem;
  background-color: ${black};
  margin-top: 0.5rem;
`;

export const CatImgContainer = styled.div`
  width: 8rem;
  position: relative;
`;

export const CatImg = styled.img`
  width: 100%;
  position: absolute;
  right: -11.5rem;
  top: -2.5rem;
  z-index: 1;
`;
