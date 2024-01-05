import { styled } from "styled-components";
import {
  borderRadiusMedium,
  mediumBorder,
  smallBorder,
} from "./theme_variables/borders";
import { primaryRed, secondaryWhite } from "./theme_variables/colors";
interface IQuestProps {
  selected: string;
}

export const QuestMenuBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding-top: 2rem;

  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

export const QuestsMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 42rem;
  max-height: 53rem;
  padding: 2rem;
  padding-top: 1rem;

  border-radius: ${borderRadiusMedium};
  border: ${mediumBorder};
  background: ${primaryRed};
`;

export const QuestConfirmContainer = styled(QuestsMenuContainer)`
  height: 25rem;
`;

export const QuestsMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 4rem;
`;

export const QuestsMenuFooter = styled(QuestsMenuHeader)`
  justify-content: center;
`;

export const QuestsMenuContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  max-height: 40rem;
`;

export const QuestContainer = styled.button<IQuestProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 18rem;
  height: 17.5rem;
  padding: 0.5rem;
  border-radius: ${borderRadiusMedium};
  background: ${secondaryWhite};
  border: ${({ selected }) =>
    selected === "true" ? "3px solid yellow" : `${smallBorder}`};
  border-radius: 1rem;
  cursor: pointer;

  &:focus {
    border: 3px solid yellow;
  }
`;

export const ConfirmCatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 18rem;
  height: 17.5rem;
  padding: 0.5rem;
  border-radius: ${borderRadiusMedium};
  background: ${secondaryWhite};
  border: ${smallBorder};
`;

export const ConfirmMissionContainer = styled(ConfirmCatContainer)``;

export const ConfirmBossContainer = styled(ConfirmCatContainer)``;

export const QuestHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 20%;
  position: relative;
  border-radius: 1rem;
`;

export const QuestContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

export const QuestFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 30%;
  border-radius: 1rem;
`;

export const QuestCatImg = styled.img`
  width: 3.5rem;
  z-index: 1;
`;