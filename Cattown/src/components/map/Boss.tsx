import { IBoss } from "../../types/missionTypes";
import {
  QuestContainer,
  QuestContent,
  QuestFooter,
  QuestHeader,
  QuestRewardBox,
  TertiaryInfoBox,
} from "../styled/Quest";
import { HeaderSmall, TextMedium, TextSmall } from "../styled/Text";

interface IBossProps {
  boss: IBoss;
  bossDead: boolean;
  selectBoss: (boss: IBoss) => void;
}

export const Boss = ({ boss, bossDead, selectBoss }: IBossProps) => {
  return (
    <QuestContainer
      onClick={() => {
        selectBoss(boss);
      }}
      disabled={bossDead}
    >
      <QuestHeader>
        <HeaderSmall>Kill {boss.name}</HeaderSmall>
      </QuestHeader>
      <QuestContent>
        <TextMedium>Damage</TextMedium>
        {boss.fireDamage > 0 && <TextSmall>Fire: {boss.fireDamage}%</TextSmall>}
        {boss.shadowDamage > 0 && (
          <TextSmall>Shadow: {boss.shadowDamage}%</TextSmall>
        )}
        {boss.waterDamage > 0 && (
          <TextSmall>Water: {boss.waterDamage}%</TextSmall>
        )}
        {boss.natureDamage > 0 && (
          <TextSmall>Nature: {boss.natureDamage}%</TextSmall>
        )}
      </QuestContent>
      <QuestFooter>
        {bossDead && (
          <TertiaryInfoBox>
            <TextMedium>{boss.name} is Defeated!</TextMedium>
          </TertiaryInfoBox>
        )}
        {!bossDead && (
          <QuestRewardBox>
            <TextMedium>MCGUFFIN</TextMedium>
            <HeaderSmall> {boss.mcguffinId} </HeaderSmall>
          </QuestRewardBox>
        )}
      </QuestFooter>
    </QuestContainer>
  );
};
