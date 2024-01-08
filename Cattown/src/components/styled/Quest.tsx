import { styled } from "styled-components";
import {
  borderRadiusMedium,
  borderRadiusRoundSmall,
  mediumBorder,
  smallBorder,
} from "./theme_variables/borders";
import {
  primaryBlue,
  primaryRed,
  primaryYellow,
  secondaryWhite,
  tertiaryGreen,
} from "./theme_variables/colors";

export const QuestMenuBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

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
  max-height: 50rem;
  padding: 2rem;

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
  gap: 2rem;
`;

export const QuestsMenuContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  max-height: 40rem;
`;

export const QuestContainer = styled.button`
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
  border-radius: 1rem;
  cursor: pointer;
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
  flex-direction: column;
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

export const QuestRewardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;
`;

export const QuestRewardBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  min-width: 3rem;
  height: 2rem;
  padding: 0.2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: ${borderRadiusRoundSmall};
  background: ${tertiaryGreen};
`;

export const SecondaryInfoBox = styled(QuestRewardBox)`
  background: ${primaryBlue};
`;

export const TertiaryInfoBox = styled(QuestRewardBox)`
  background: ${primaryYellow};
  height: 3rem;
`;
