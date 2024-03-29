import { styled } from "styled-components";
import { secondaryWhite } from "./style_variables/colors";
import { borderRadiusMedium, smallBorder } from "./style_variables/borders";
import { bounceAnimation } from "./Animations";
import { devices } from "./style_variables/devices";

export const CatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 18rem;
  height: 16rem;
  padding: 1rem;
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

export const CatContainerQuest = styled(CatContainer)`
  height: 6rem;
  width: 15rem;
  padding: 0.5rem;
`;

export const NoCatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 20%;
`;

export const CatHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 5.5rem;
  width: 100%;
`;

export const CatHeaderTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 60%;
`;

export const CatContentContainer = styled(CatHeaderContainer)`
  flex-direction: row;
  align-items: center;
  height: 6.5rem;
`;

export const CatFooterContainer = styled(CatContentContainer)`
  align-items: flex-end;
  height: 3.5rem;
`;

export const CatContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 50%;
`;

export const CatTextColumn = styled(CatContentColumn)`
  width: 60%;
`;
export const CatTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1.5rem;
  gap: 0.5rem;
  width: 80%;
`;

export const CatStatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CatDivider = styled.div`
  width: 7rem;
  height: 0rem;
  border-bottom: ${smallBorder};
  margin-top: 0.5rem;
`;

export const CatImgContainer = styled.div`
  width: 7.5rem;
  position: relative;

  @media (${devices.tablet}) {
    width: 8rem;
  }
`;

export const CatImgContainerQuest = styled.div`
  width: 5rem;
  position: relative;
`;

export const CatImg = styled.img`
  width: 100%;
  position: absolute;
  right: -12rem;
  top: -3rem;
  z-index: 1;
`;

export const CatImgQuest = styled(CatImg)`
  right: -8rem;
  top: -3.5rem;
`;
