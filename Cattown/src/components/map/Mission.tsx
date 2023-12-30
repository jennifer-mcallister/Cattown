import { useState } from "react";
import { IMission } from "../../types/missionTypes";
import {
  QuestContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
} from "../styled/Quest";
import { TextMedium, TextSmall } from "../styled/Text";

interface IMissionProps {
  mission: IMission;
  selectMission: (mission: IMission) => void;
}

export const Mission = ({ mission, selectMission }: IMissionProps) => {
  const [selectedMission, setSelectedMission] = useState<string>("false");
  return (
    <>
      <QuestContainer
        onClick={() => {
          selectMission(mission);
          setSelectedMission("true");
        }}
        selected={selectedMission}
      >
        <QuestHeader>
          <h3>{mission.type}</h3>
        </QuestHeader>
        <QuestContent>
          <TextMedium>
            {mission.type === "explore"
              ? "Explore the lands"
              : "Scavenge for hidden treasures"}
          </TextMedium>
          <h4>Time:</h4>
          <TextSmall>{mission.timeInSec} Sec</TextSmall>
        </QuestContent>
        <QuestFooter>
          <TextMedium>{mission.xpReceived} XP</TextMedium>
          <TextMedium>{mission.goldReceived} GOLD</TextMedium>
        </QuestFooter>
      </QuestContainer>
    </>
  );
};
