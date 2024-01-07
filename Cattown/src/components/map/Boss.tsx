import { IBoss } from "../../types/missionTypes";
import {
  QuestContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
  QuestRewardBox,
} from "../styled/Quest";
import { HeaderSmall, TextMedium, TextSmall } from "../styled/Text";

interface IBossProps {
  boss: IBoss;
  selectBoss: (boss: IBoss) => void;
}

export const Boss = ({ boss, selectBoss }: IBossProps) => {
  return (
    <QuestContainer
      onClick={() => {
        selectBoss(boss);
      }}
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
        <QuestRewardBox>
          <TextMedium>MCGUFFIN</TextMedium>
          <HeaderSmall> {boss.mcguffinId} </HeaderSmall>
        </QuestRewardBox>
      </QuestFooter>
    </QuestContainer>
  );
};
