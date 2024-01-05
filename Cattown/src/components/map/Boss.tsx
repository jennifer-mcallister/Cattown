import { useState } from "react";
import { IBoss } from "../../types/missionTypes";
import {
  QuestContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
} from "../styled/Quest";
import { HeaderSmall, TextMedium, TextSmall } from "../styled/Text";

interface IBossProps {
  boss: IBoss;
  selectBoss: (boss: IBoss) => void;
}

export const Boss = ({ boss, selectBoss }: IBossProps) => {
  const [selectedBoss, setSelectedBoss] = useState<string>("false");
  return (
    <QuestContainer
      onClick={() => {
        selectBoss(boss);
        setSelectedBoss("true");
      }}
      selected={selectedBoss}
    >
      <QuestHeader>
        <HeaderSmall>Kill {boss.name}</HeaderSmall>
      </QuestHeader>
      <QuestContent>
        <h4>Damage:</h4>
        <TextSmall>Fire: {boss.fireDamage}</TextSmall>
        <TextSmall>Shadow: {boss.shadowDamage}</TextSmall>
        <TextSmall>Water: {boss.waterDamage}</TextSmall>
        <TextSmall>Nature: {boss.natureDamage}</TextSmall>
      </QuestContent>
      <QuestFooter>
        <TextMedium>MCGUFFIN {boss.mcguffinId} </TextMedium>
      </QuestFooter>
    </QuestContainer>
  );
};
