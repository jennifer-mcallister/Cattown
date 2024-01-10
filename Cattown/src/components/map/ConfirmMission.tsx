import { ProgressBar } from "../ProgressBar";
import { ButtonLarge } from "../styled/Button";
import {
  ConfirmMissionContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
  QuestRewardBox,
  QuestRewardContainer,
  QuestsMenuContent,
  QuestsMenuFooter,
} from "../styled/Quest";
import {
  HeaderSmall,
  TextMedium,
  TextSmall,
  TextSmallBold,
} from "../styled/Text";
import placeholder from "/assets/cat_white.webp";
import { IMissionQuest } from "./QuestsMenu";
import {
  CatContainer,
  CatContainerQuest,
  CatContent,
  CatContentColumn,
  CatDivider,
  CatFooter,
  CatHeader,
  CatHeaderTitleContainer,
  CatImg,
  CatImgContainer,
  CatImgContainerQuest,
  CatImgQuest,
  CatTextColumn,
  CatTextContainer,
} from "../styled/Cat";
import { useEffect, useState } from "react";
import { HeaderCoinImg } from "../styled/HeaderStyle";
import coin from "/assets/coin.webp";

interface IConfirmMissionProps {
  quest: IMissionQuest;
  confirmMission: () => void;
}
export const ConfirmMission = ({
  quest,
  confirmMission: confirmMission,
}: IConfirmMissionProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgPath = `/assets/${quest.cat.img}`;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoading = () => {
    setImgLoaded(true);
  };
  return (
    <>
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
              <QuestRewardContainer>
                <QuestRewardBox>
                  <TextMedium>{quest.mission.xpReceived} XP</TextMedium>
                </QuestRewardBox>
                <QuestRewardBox>
                  <TextMedium>{quest.mission.goldReceived}</TextMedium>
                  <HeaderCoinImg src={coin} />
                </QuestRewardBox>
              </QuestRewardContainer>
            </QuestFooter>
          </ConfirmMissionContainer>
          {windowWidth < 769 && (
            <>
              <CatContainerQuest
                key={quest.cat.id}
                className={imgLoaded ? "loaded" : ""}
              >
                <CatHeader>
                  <CatHeaderTitleContainer>
                    <HeaderSmall>{quest.cat.name} </HeaderSmall>
                    <CatTextColumn>
                      <TextSmall>Lvl. {quest.cat.level}</TextSmall>
                    </CatTextColumn>
                  </CatHeaderTitleContainer>
                  <CatImgContainerQuest>
                    <CatImgQuest
                      src={quest.cat.img ? imgPath : placeholder}
                      onLoad={handleLoading}
                      alt="Image of a cat"
                    />
                  </CatImgContainerQuest>
                </CatHeader>
                <CatFooter>
                  <HeaderSmall>I'm Ready!</HeaderSmall>
                </CatFooter>
              </CatContainerQuest>
            </>
          )}
          {windowWidth > 786 && (
            <CatContainer
              key={quest.cat.id}
              className={imgLoaded ? "loaded" : ""}
            >
              <CatHeader>
                <CatImgContainer>
                  <CatImg
                    src={quest.cat.img ? imgPath : placeholder}
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
          )}
        </QuestsMenuContent>
        <QuestsMenuFooter>
          <ButtonLarge onClick={confirmMission}>OK</ButtonLarge>
        </QuestsMenuFooter>
      </>
    </>
  );
};
