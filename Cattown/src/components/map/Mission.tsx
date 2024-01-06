import { IMission } from "../../types/missionTypes";
import {
  QuestContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
} from "../styled/Quest";
import { HeaderSmall, TextMedium, TextSmall } from "../styled/Text";
import { HeaderCoinImg, HeaderGold } from "../styled/HeaderStyle";
import coin from "/assets/coin.png";

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
          <TextSmall>Time: {mission.timeInSec} Sec</TextSmall>
        </QuestContent>
        <QuestFooter>
          <TextMedium>{mission.xpReceived} XP</TextMedium>
          <HeaderGold>
            <TextMedium>{mission.goldReceived}</TextMedium>
            <HeaderCoinImg src={coin} />
          </HeaderGold>
        </QuestFooter>
      </QuestContainer>
    </>
  );
};
