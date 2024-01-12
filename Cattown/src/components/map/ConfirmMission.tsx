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
import { HeaderSmall, TextMedium, TextSmall } from "../styled/Text";
import placeholder from "/assets/cat_white.webp";
import { IMissionQuest } from "./QuestsMenu";
import {
  CatContainer,
  CatContainerQuest,
  CatFooterContainer,
  CatHeaderContainer,
  CatHeaderTitleContainer,
  CatImgContainerQuest,
  CatImgQuest,
} from "../styled/Cat";
import { useEffect, useState } from "react";
import { HeaderCoinImg } from "../styled/HeaderStyle";
import coin from "/assets/coin.webp";
import { CatHeader } from "../cat_card/CatHeader";
import { CatContent } from "../cat_card/CatContent";

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
        <QuestsMenuContent gridcolumns="1fr 1fr">
          <ConfirmMissionContainer>
            <QuestHeader>
              <HeaderSmall>{quest.mission.type}</HeaderSmall>
            </QuestHeader>
            <QuestContent>
              <TextSmall>Time: {quest.mission.timeInSec / 60} min</TextSmall>
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
                <CatHeaderContainer>
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
                </CatHeaderContainer>
                <CatFooterContainer>
                  <TertiaryInfoBox>
                    <HeaderSmall>I'm Ready!</HeaderSmall>
                  </TertiaryInfoBox>
                </CatFooterContainer>
              </CatContainerQuest>
            </>
          )}
          {windowWidth > 786 && (
            <CatContainer
              key={quest.cat.id}
              className={imgLoaded ? "loaded" : ""}
            >
              <CatHeader cat={quest.cat} handleLoading={handleLoading} />
              <CatContent cat={quest.cat} />
              <CatFooterContainer>
                <TertiaryInfoBox>
                  <HeaderSmall>I'm Ready!</HeaderSmall>
                </TertiaryInfoBox>
              </CatFooterContainer>
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
