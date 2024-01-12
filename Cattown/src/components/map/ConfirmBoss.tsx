import { ButtonMedium } from "../styled/Button";
import {
  ConfirmBossContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
  QuestsMenuContent,
  QuestsMenuFooter,
  TertiaryInfoBox,
} from "../styled/Quest";
import { HeaderSmall, TextMedium, TextSmall } from "../styled/Text";
import { IBossQuest } from "./QuestsMenu";
import { useEffect, useState } from "react";

import { IStats } from "../../types/savefileTypes";
import placeholder from "/assets/cat_white.webp";
import {
  CatContainer,
  CatContainerQuest,
  CatFooterContainer,
  CatHeaderContainer,
  CatHeaderTitleContainer,
  CatImgContainerQuest,
  CatImgQuest,
} from "../styled/Cat";
import { CatHeader } from "../cat_card/CatHeader";
import { CatContent } from "../cat_card/CatContent";
import { countOutBossFightSuccessChance } from "../../helpers/combatCalculator";

interface IConfirmBossProps {
  quest: IBossQuest;
  userStats: IStats;
  confirmBoss: () => void;
}

export const ConfirmBoss = ({
  quest,
  userStats,
  confirmBoss,
}: IConfirmBossProps) => {
  const [successChance, setSuccessChance] = useState<number>();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoading = () => {
    setImgLoaded(true);
  };

  useEffect(() => {
    const chance = countOutBossFightSuccessChance(
      quest.boss,
      quest.cats,
      userStats
    );
    setSuccessChance(chance);
  }, []);

  return (
    <>
      <QuestsMenuContent
        gridcolumns={windowHeight < 840 ? "1fr 1fr 1fr 1fr" : "1fr 1fr"}
      >
        <ConfirmBossContainer>
          <QuestHeader>
            <HeaderSmall>Kill {quest.boss.name}</HeaderSmall>
          </QuestHeader>
          {windowWidth > 768 && (
            <QuestContent>
              <h4>Damage:</h4>
              <TextSmall>Fire: {quest.boss.fireDamage}</TextSmall>
              <TextSmall>Shadow: {quest.boss.shadowDamage}</TextSmall>
              <TextSmall>Water: {quest.boss.waterDamage}</TextSmall>
              <TextSmall>Nature: {quest.boss.natureDamage}</TextSmall>
            </QuestContent>
          )}

          <QuestFooter>
            <TextMedium>MCGUFFIN {quest.boss.mcguffinId} </TextMedium>
          </QuestFooter>
        </ConfirmBossContainer>
        {windowWidth > 767 && (
          <>
            {quest.cats.map((cat) => (
              <CatContainer key={cat.id} className={imgLoaded ? "loaded" : ""}>
                <CatHeader cat={cat} handleLoading={handleLoading} />
                <CatContent cat={cat} />
                <CatFooterContainer>
                  <TertiaryInfoBox>
                    <HeaderSmall>I'm Ready!</HeaderSmall>
                  </TertiaryInfoBox>
                </CatFooterContainer>
              </CatContainer>
            ))}
          </>
        )}
        {windowWidth < 769 && (
          <>
            {quest.cats.map((cat) => (
              <CatContainerQuest
                key={cat.id}
                className={imgLoaded ? "loaded" : ""}
              >
                <CatHeaderContainer>
                  <CatHeaderTitleContainer>
                    <HeaderSmall>{cat.name} </HeaderSmall>
                  </CatHeaderTitleContainer>
                  <CatImgContainerQuest>
                    <CatImgQuest
                      src={cat.img ? `/assets/${cat.img}` : placeholder}
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
            ))}
          </>
        )}
      </QuestsMenuContent>
      <QuestsMenuFooter>
        <TertiaryInfoBox>
          {windowWidth > 768 && (
            <HeaderSmall>Success rate: {successChance}%</HeaderSmall>
          )}
          {windowWidth < 769 && (
            <TextMedium>Success rate: {successChance}%</TextMedium>
          )}
        </TertiaryInfoBox>

        <ButtonMedium onClick={confirmBoss}>OK</ButtonMedium>
      </QuestsMenuFooter>
    </>
  );
};
