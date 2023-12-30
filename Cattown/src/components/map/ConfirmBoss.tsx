import { ProgressBar } from "../ProgressBar";
import { ButtonLarge } from "../styled/Button";
import {
  ConfirmBossContainer,
  ConfirmCatContainer,
  QuestCatImg,
  QuestContent,
  QuestFooter,
  QuestHeader,
  QuestsMenuContent,
  QuestsMenuFooter,
} from "../styled/Quest";
import { TextMedium, TextSmall } from "../styled/Text";
import catPlaceholder from "../../assets/cathead_placeholder.png";
import { IBossQuest } from "./QuestsMenu";
import { useEffect, useState } from "react";
import { countOutBossFightSuccessChance } from "../../helpers/gameCalculationHelpers";
import { IStats } from "../../types/savefileTypes";

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
            <h3>Kill {quest.boss.name}</h3>
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
          <ConfirmCatContainer key={cat.id}>
            <QuestHeader>
              <h2>{cat.name}</h2>
              <TextMedium>Lvl. {cat.level}</TextMedium>
            </QuestHeader>
            <QuestContent>
              <QuestCatImg src={catPlaceholder} />
              <TextMedium>{cat.status}</TextMedium>
            </QuestContent>
            <QuestFooter>
              <ProgressBar catLevel={cat.level} catXP={cat.xp} />
            </QuestFooter>
          </ConfirmCatContainer>
        ))}
      </QuestsMenuContent>
      <h2>Success Rate: {successChance}% </h2>
      <QuestsMenuFooter>
        <ButtonLarge onClick={confirmBoss}>OK</ButtonLarge>
      </QuestsMenuFooter>
    </>
  );
};
