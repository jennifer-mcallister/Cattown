import { styled } from "styled-components";
interface IQuestProps {
  selected: string;
}

export const QuestsMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36rem;
  max-height: 36rem;
  position: absolute;
  background-color: #6a6a6a;
  border: 6px solid black;
  border-radius: 1rem;
  padding: 2rem;
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
  max-height: 90%;
`;

export const QuestContainer = styled.button<IQuestProps>`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 15rem;
  position: relative;

  background-color: #bebebe;
  border: ${({ selected }) =>
    selected === "true" ? "3px solid yellow" : "3px solid black"};
  border-radius: 1rem;
  cursor: pointer;

  &:focus {
    border: 3px solid yellow;
  }
`;

export const ConfirmCatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 15rem;
  position: relative;

  background-color: grey;
  border: 3px solid black;
  border-radius: 1rem;
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
  background-color: lavender;
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

  background-color: lavender;
`;

export const QuestCatImg = styled.img`
  width: 3.5rem;
  z-index: 1;
`;
