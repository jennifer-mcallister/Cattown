import { IMission } from "../../types/missionTypes";
import {
  QuestContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
  QuestRewardBox,
  QuestRewardContainer,
} from "../styled/Quest";
import { HeaderSmall, TextMedium, TextSmall } from "../styled/Text";
import { HeaderCoinImg } from "../styled/HeaderStyle";
import coin from "/assets/coin.webp";

interface IMissionProps {
  mission: IMission;
  selectMission: (mission: IMission) => void;
}

export const Mission = ({ mission, selectMission }: IMissionProps) => {
  return (
    <>
      <QuestContainer
        onClick={() => {
          selectMission(mission);
        }}
      >
        <QuestHeader>
          <HeaderSmall>{mission.type}</HeaderSmall>
        </QuestHeader>
        <QuestContent>
          <TextMedium>
            {mission.type === "explore"
              ? "Explore the lands"
              : "Scavenge for hidden treasures"}
          </TextMedium>
          <TextSmall>{mission.timeInSec / 60} min</TextSmall>
        </QuestContent>
        <QuestFooter>
          <QuestRewardContainer>
            <QuestRewardBox>
              <TextMedium>{mission.xpReceived} XP</TextMedium>
            </QuestRewardBox>
            <QuestRewardBox>
              <TextMedium>{mission.goldReceived}</TextMedium>
              <HeaderCoinImg src={coin} />
            </QuestRewardBox>
          </QuestRewardContainer>
        </QuestFooter>
      </QuestContainer>
    </>
  );
};
