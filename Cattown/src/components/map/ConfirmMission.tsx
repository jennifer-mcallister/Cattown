import { ProgressBar } from "../ProgressBar";
import { ButtonLarge } from "../styled/Button";
import {
  ConfirmCatContainer,
  ConfirmMissionContainer,
  QuestCatImg,
  QuestContent,
  QuestFooter,
  QuestHeader,
  QuestsMenuContent,
  QuestsMenuFooter,
} from "../styled/Quest";
import { TextMedium, TextSmall } from "../styled/Text";
import catPlaceholder from "../../assets/cathead_placeholder.png";
import { IMissionQuest } from "./QuestsMenu";

interface IConfirmMissionProps {
  quest: IMissionQuest;
  confirmMission: () => void;
}
export const ConfirmMission = ({
  quest,
  confirmMission: confirmMission,
}: IConfirmMissionProps) => {
  return (
    <>
      <QuestsMenuContent>
        <ConfirmMissionContainer>
          <QuestHeader>
            <h3>{quest.mission.type}</h3>
          </QuestHeader>
          <QuestContent>
            <h4>Time:</h4>
            <TextSmall>{quest.mission.timeInSec} Sec</TextSmall>
          </QuestContent>
          <QuestFooter>
            <TextMedium>{quest.mission.xpReceived} XP</TextMedium>
            <TextMedium>{quest.mission.goldReceived} GOLD</TextMedium>
          </QuestFooter>
        </ConfirmMissionContainer>
        <ConfirmCatContainer>
          <QuestHeader>
            <h2>{quest.cat.name}</h2>
            <TextMedium>Lvl. {quest.cat.level}</TextMedium>
          </QuestHeader>
          <QuestContent>
            <QuestCatImg src={catPlaceholder} />
            <TextMedium>{quest.cat.status}</TextMedium>
          </QuestContent>
          <QuestFooter>
            <ProgressBar catLevel={quest.cat.level} catXP={quest.cat.xp} />
          </QuestFooter>
        </ConfirmCatContainer>
      </QuestsMenuContent>
      <QuestsMenuFooter>
        <ButtonLarge onClick={confirmMission}>OK</ButtonLarge>
      </QuestsMenuFooter>
    </>
  );
};
