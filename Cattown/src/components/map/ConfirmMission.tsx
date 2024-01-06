import { ProgressBar } from "../ProgressBar";
import { ButtonLarge } from "../styled/Button";
import {
  ConfirmMissionContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
  QuestsMenuContent,
  QuestsMenuFooter,
} from "../styled/Quest";
import {
  HeaderSmall,
  TextMedium,
  TextSmall,
  TextSmallBold,
} from "../styled/Text";
import placeholder from "/assets/cat_white.png";
import { IMissionQuest } from "./QuestsMenu";
import {
  CatContainer,
  CatContent,
  CatContentColumn,
  CatDivider,
  CatFooter,
  CatHeader,
  CatHeaderTitleContainer,
  CatImg,
  CatImgContainer,
  CatTextContainer,
} from "../styled/Cat";
import { useState } from "react";

interface IConfirmMissionProps {
  quest: IMissionQuest;
  confirmMission: () => void;
}
export const ConfirmMission = ({
  quest,
  confirmMission: confirmMission,
}: IConfirmMissionProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoading = () => {
    setImgLoaded(true);
  };
  return (
    <>
      <QuestsMenuContent>
        <ConfirmMissionContainer>
          <QuestHeader>
            <HeaderSmall>{quest.mission.type}</HeaderSmall>
          </QuestHeader>
          <QuestContent>
            <TextSmall>Time: {quest.mission.timeInSec} Sec</TextSmall>
          </QuestContent>
          <QuestFooter>
            <TextMedium>{quest.mission.xpReceived} XP</TextMedium>
            <TextMedium>{quest.mission.goldReceived} GOLD</TextMedium>
          </QuestFooter>
        </ConfirmMissionContainer>
        <CatContainer key={quest.cat.id} className={imgLoaded ? "loaded" : ""}>
          <CatHeader>
            <CatImgContainer>
              <CatImg
                src={placeholder}
                onLoad={handleLoading}
                alt="Image of a cat"
              />
            </CatImgContainer>
            <CatHeaderTitleContainer>
              <HeaderSmall>{quest.cat.name} </HeaderSmall>
              <TextSmallBold>Lvl. {quest.cat.level}</TextSmallBold>
            </CatHeaderTitleContainer>
            <ProgressBar catLevel={quest.cat.level} catXP={quest.cat.xp} />
          </CatHeader>
          <CatContent>
            <CatContentColumn>
              <TextMedium>Stats</TextMedium>
              <CatDivider />
              <CatTextContainer>
                <TextSmall>Health</TextSmall>
                <TextSmall>{quest.cat.health}</TextSmall>
              </CatTextContainer>
              <CatTextContainer>
                <TextSmall>Strength</TextSmall>
                <TextSmall>{quest.cat.strength}</TextSmall>
              </CatTextContainer>
            </CatContentColumn>
            <CatContentColumn>
              <TextMedium>Status</TextMedium>
              <CatDivider />
              <TextSmallBold>{quest.cat.status}</TextSmallBold>
              {quest.cat.status === "training" && (
                <TextSmall>
                  Back in: {quest.cat.trainingTimeLeft?.h}:
                  {quest.cat.trainingTimeLeft?.min}:
                  {quest.cat.trainingTimeLeft?.sec}
                </TextSmall>
              )}
              {quest.cat.status === "on mission" && (
                <TextSmall>
                  Back in: {quest.cat.missionTimeLeft?.h}:
                  {quest.cat.missionTimeLeft?.min}:
                  {quest.cat.missionTimeLeft?.sec}
                </TextSmall>
              )}
              {quest.cat.status === "downed" && (
                <TextSmall>
                  Back in: {quest.cat.downedTimeLeft?.h}:
                  {quest.cat.downedTimeLeft?.min}:
                  {quest.cat.downedTimeLeft?.sec}
                </TextSmall>
              )}
            </CatContentColumn>
          </CatContent>
          <CatFooter>
            <HeaderSmall>I'm Ready!</HeaderSmall>
          </CatFooter>
        </CatContainer>
      </QuestsMenuContent>
      <QuestsMenuFooter>
        <ButtonLarge onClick={confirmMission}>OK</ButtonLarge>
      </QuestsMenuFooter>
    </>
  );
};
