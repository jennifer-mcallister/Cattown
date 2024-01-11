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
  TertiaryInfoBox,
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
  CatFooter,
  CatHeader,
  CatHeaderTitleContainer,
  CatImg,
  CatImgContainer,
  CatImgContainerQuest,
  CatImgQuest,
  CatStatusContainer,
  CatTextContainer,
} from "../styled/Cat";
import { useEffect, useState } from "react";
import { HeaderCoinImg } from "../styled/HeaderStyle";
import coin from "/assets/coin.webp";
import { formatTime } from "../../helpers/gameCalculationHelpers";
import { StatusBox } from "../styled/NotificationStyle";
import { IconSmall } from "../styled/Icon";
import {
  primaryBlue,
  primaryRed,
  secondaryGreen,
  trainingColor,
} from "../styled/theme_variables/colors";
const timerIcon = "/assets/icons/timer.png";

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
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (quest.cat.status === "training") {
      setBgColor(trainingColor);
    }
    if (quest.cat.status === "downed") {
      setBgColor(primaryRed);
    }
    if (quest.cat.status === "in camp") {
      setBgColor(secondaryGreen);
    }
    if (quest.cat.status === "on mission") {
      setBgColor(primaryBlue);
    }
  }, [quest.cat.status]);

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
                  <HeaderSmall>Stats</HeaderSmall>
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
                  {quest.cat.status === "training" && (
                    <CatStatusContainer>
                      <TextSmall>
                        {formatTime(
                          quest.cat.trainingTimeLeft.h,
                          quest.cat.trainingTimeLeft.min,
                          quest.cat.trainingTimeLeft.sec
                        )}
                      </TextSmall>
                    </CatStatusContainer>
                  )}
                  {quest.cat.status === "on mission" && (
                    <CatStatusContainer>
                      <TextSmall>
                        {formatTime(
                          quest.cat.missionTimeLeft?.h,
                          quest.cat.missionTimeLeft?.min,
                          quest.cat.missionTimeLeft?.sec
                        )}
                      </TextSmall>
                    </CatStatusContainer>
                  )}
                  {quest.cat.status === "downed" && (
                    <CatStatusContainer>
                      <TextSmall>
                        {formatTime(
                          quest.cat.downedTimeLeft?.h,
                          quest.cat.downedTimeLeft?.min,
                          quest.cat.downedTimeLeft?.sec
                        )}
                      </TextSmall>
                    </CatStatusContainer>
                  )}
                  <StatusBox bgcolor={bgColor}>
                    {quest.cat.status !== "in camp" && (
                      <IconSmall src={timerIcon} alt="timer" />
                    )}

                    <TextMedium>{quest.cat.status}</TextMedium>
                  </StatusBox>
                </CatContentColumn>
              </CatContent>
              <CatFooter>
                <TertiaryInfoBox>
                  <HeaderSmall>I'm Ready!</HeaderSmall>
                </TertiaryInfoBox>
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
