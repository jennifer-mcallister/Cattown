import { styled } from "styled-components";
import {
  borderRadiusMedium,
  borderRadiusRoundSmall,
  mediumBorder,
  smallBorder,
} from "./style_variables/borders";
import {
  primaryBlue,
  primaryPink,
  primaryYellow,
  secondaryWhite,
  tertiaryGreen,
} from "./style_variables/colors";
import { devices } from "./style_variables/devices";

export const QuestMenuBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
`;

export const QuestsMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 70vw;
  max-height: 90vh;
  padding: 2rem;
  padding-top: 1rem;

  border-radius: ${borderRadiusMedium};
  border: ${mediumBorder};
  background-color: ${primaryPink};
  @media (${devices.tablet}) {
    padding: 3rem;
    padding-top: 1rem;
    width: 42rem;
    gap: 2rem;
  }
`;

export const QuestConfirmContainer = styled(QuestsMenuContainer)`
  height: 25rem;
`;

export const QuestsMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 3.5rem;

  @media (${devices.tablet}) {
    height: 4rem;
  }
`;

export const QuestsMenuFooter = styled(QuestsMenuHeader)`
  justify-content: center;
  gap: 2rem;
`;

export const QuestsMenuContent = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  max-height: 40rem;
  min-height: 10rem;

  @media (${devices.tablet}) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }
`;

export const QuestContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 15rem;
  min-height: 10.5rem;
  padding: 0.5rem;
  border-radius: ${borderRadiusMedium};
  background: ${secondaryWhite};
  border: ${smallBorder};
  border-radius: 1rem;
  cursor: pointer;

  @media (${devices.tablet}) {
    height: 17.5rem;
    width: 18rem;
    padding: 1rem;
  }
`;

export const ConfirmCatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 15rem;
  min-height: 5.5rem;
  padding: 0.5rem;
  border-radius: ${borderRadiusMedium};
  background: ${secondaryWhite};
  border: ${smallBorder};

  @media (${devices.tablet}) {
    height: 16rem;
    width: 18rem;
    padding: 1rem;
  }
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
  white-space: nowrap;
`;

export const SecondaryInfoBox = styled(QuestRewardBox)`
  background: ${primaryBlue};
`;

export const TertiaryInfoBox = styled(QuestRewardBox)`
  background: ${primaryYellow};
  height: 3rem;
`;
