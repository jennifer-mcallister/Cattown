import { ButtonIcon, ButtonLargeSelect, ButtonMedium } from "../styled/Button";
import { Icon } from "../styled/Icon";
import {
  MenuBackground,
  MenuContainer,
  MenuFooter,
  MenuHeader,
  MenuHeaderItems,
} from "../styled/Menu";
import { QuestRewardBox, SecondaryInfoBox } from "../styled/Quest";
import { HeaderSmall, TextMedium } from "../styled/Text";
import exitIcon from "/assets/icons/exit.png";

interface IPickTimeMenuProps {
  toggleMenu: () => void;
  selectTimeInMinutes: (min: number) => void;
  confirmTraining: () => void;
}
export const PickTimeMenu = ({
  toggleMenu,
  selectTimeInMinutes,
  confirmTraining,
}: IPickTimeMenuProps) => {
  const xpPerMinute = 150;
  return (
    <MenuBackground>
      <MenuContainer>
        <MenuHeader>
          <MenuHeaderItems>
            <HeaderSmall>Pick time</HeaderSmall>
            <ButtonIcon onClick={toggleMenu}>
              <Icon src={exitIcon} alt="exit" />
            </ButtonIcon>
          </MenuHeaderItems>
        </MenuHeader>
        <ButtonLargeSelect
          onClick={() => {
            selectTimeInMinutes(1);
          }}
        >
          <QuestRewardBox>{1 * xpPerMinute} xp</QuestRewardBox>
          <SecondaryInfoBox>
            <TextMedium>1 min</TextMedium>
          </SecondaryInfoBox>
        </ButtonLargeSelect>
        <ButtonLargeSelect
          onClick={() => {
            selectTimeInMinutes(5);
          }}
        >
          <QuestRewardBox>{5 * xpPerMinute} xp</QuestRewardBox>
          <SecondaryInfoBox>
            <TextMedium>5 min</TextMedium>
          </SecondaryInfoBox>
        </ButtonLargeSelect>
        <ButtonLargeSelect
          onClick={() => {
            selectTimeInMinutes(15);
          }}
        >
          <QuestRewardBox>{15 * xpPerMinute} xp</QuestRewardBox>
          <SecondaryInfoBox>
            <TextMedium>15 min</TextMedium>
          </SecondaryInfoBox>
        </ButtonLargeSelect>
        <ButtonLargeSelect
          onClick={() => {
            selectTimeInMinutes(60);
          }}
        >
          <QuestRewardBox>{60 * xpPerMinute} xp</QuestRewardBox>
          <SecondaryInfoBox>
            <TextMedium>1 h</TextMedium>
          </SecondaryInfoBox>
        </ButtonLargeSelect>
        <ButtonLargeSelect
          onClick={() => {
            selectTimeInMinutes(120);
          }}
        >
          <QuestRewardBox>{120 * xpPerMinute} xp</QuestRewardBox>
          <SecondaryInfoBox>
            <TextMedium>2 h</TextMedium>
          </SecondaryInfoBox>
        </ButtonLargeSelect>
        <ButtonLargeSelect
          onClick={() => {
            selectTimeInMinutes(480);
          }}
        >
          <QuestRewardBox>{480 * xpPerMinute} xp</QuestRewardBox>
          <SecondaryInfoBox>
            <TextMedium>8 h</TextMedium>
          </SecondaryInfoBox>
        </ButtonLargeSelect>
        <MenuFooter>
          <ButtonMedium onClick={confirmTraining}>Ok</ButtonMedium>
        </MenuFooter>
      </MenuContainer>
    </MenuBackground>
  );
};
