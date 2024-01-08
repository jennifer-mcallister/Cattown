import { ProgressBar } from "../ProgressBar";
import { ButtonLarge } from "../styled/Button";
import {
  ConfirmBossContainer,
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
import { IBossQuest } from "./QuestsMenu";
import { useEffect, useState } from "react";
import { countOutBossFightSuccessChance } from "../../helpers/gameCalculationHelpers";
import { IStats } from "../../types/savefileTypes";
import placeholder from "/assets/cat_white.png";
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
      <QuestsMenuContent>
        <ConfirmBossContainer>
          <QuestHeader>
            <HeaderSmall>Kill {quest.boss.name}</HeaderSmall>
          </QuestHeader>
          <QuestContent>
            <h4>Damage:</h4>
            <TextSmall>Fire: {quest.boss.fireDamage}</TextSmall>
            <TextSmall>Shadow: {quest.boss.shadowDamage}</TextSmall>
            <TextSmall>Water: {quest.boss.waterDamage}</TextSmall>
            <TextSmall>Nature: {quest.boss.natureDamage}</TextSmall>
          </QuestContent>
          <QuestFooter>
            <TextMedium>MCGUFFIN {quest.boss.mcguffinId} </TextMedium>
          </QuestFooter>
        </ConfirmBossContainer>
        {quest.cats.map((cat) => (
          <CatContainer key={cat.id} className={imgLoaded ? "loaded" : ""}>
            <CatHeader>
              <CatImgContainer>
                <CatImg
                  src={cat.img ? `/assets/${cat.img}` : placeholder}
                  onLoad={handleLoading}
                  alt="Image of a cat"
                />
              </CatImgContainer>
              <CatHeaderTitleContainer>
                <HeaderSmall>{cat.name} </HeaderSmall>
                <TextSmallBold>Lvl. {cat.level}</TextSmallBold>
              </CatHeaderTitleContainer>
              <ProgressBar catLevel={cat.level} catXP={cat.xp} />
            </CatHeader>
            <CatContent>
              <CatContentColumn>
                <TextMedium>Stats</TextMedium>
                <CatDivider />
                <CatTextContainer>
                  <TextSmall>Health</TextSmall>
                  <TextSmall>{cat.health}</TextSmall>
                </CatTextContainer>
                <CatTextContainer>
                  <TextSmall>Strength</TextSmall>
                  <TextSmall>{cat.strength}</TextSmall>
                </CatTextContainer>
              </CatContentColumn>
              <CatContentColumn>
                <TextMedium>Status</TextMedium>
                <CatDivider />
                <TextSmallBold>{cat.status}</TextSmallBold>
                {cat.status === "training" && (
                  <TextSmall>
                    Back in: {cat.trainingTimeLeft?.h}:
                    {cat.trainingTimeLeft?.min}:{cat.trainingTimeLeft?.sec}
                  </TextSmall>
                )}
                {cat.status === "on mission" && (
                  <TextSmall>
                    Back in: {cat.missionTimeLeft?.h}:{cat.missionTimeLeft?.min}
                    :{cat.missionTimeLeft?.sec}
                  </TextSmall>
                )}
                {cat.status === "downed" && (
                  <TextSmall>
                    Back in: {cat.downedTimeLeft?.h}:{cat.downedTimeLeft?.min}:
                    {cat.downedTimeLeft?.sec}
                  </TextSmall>
                )}
              </CatContentColumn>
            </CatContent>
            <CatFooter>
              <HeaderSmall>I'm Ready!</HeaderSmall>
            </CatFooter>
          </CatContainer>
        ))}
      </QuestsMenuContent>
      <QuestsMenuFooter>
        <HeaderSmall>Success Rate: {successChance}% </HeaderSmall>
        <ButtonLarge onClick={confirmBoss}>OK</ButtonLarge>
      </QuestsMenuFooter>
    </>
  );
};
