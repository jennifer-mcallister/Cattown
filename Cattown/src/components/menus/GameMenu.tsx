import { useNavigate } from "react-router";
import {
  MenuBackground,
  MenuBody,
  MenuContainer,
  MenuHeader,
  MenuHeaderItems,
} from "../styled/Menu";
import { ButtonIcon, ButtonLarge } from "../styled/Button";
import { HeaderCoinImg, HeaderGold } from "../styled/HeaderStyle";
import { TertiaryInfoBox } from "../styled/Quest";
import { HeaderSmall } from "../styled/Text";
import coin from "/assets/coin.webp";
import exitIcon from "/assets/icons/exit.png";
import { Icon } from "../styled/Icon";

interface IGameMenuProps {
  toggleMenu: () => void;
  show: boolean;
  usergold: number;
}

export const GameMenu = ({ toggleMenu, show, usergold }: IGameMenuProps) => {
  const navigate = useNavigate();

  const goToLocation = (path: string) => {
    navigate(path);
    toggleMenu();
  };

  return (
    <>
      {show && (
        <MenuBackground>
          <MenuContainer>
            <MenuHeader>
              <MenuHeaderItems>
                <TertiaryInfoBox>
                  <HeaderGold>
                    <HeaderSmall>{usergold}</HeaderSmall>
                    <HeaderCoinImg src={coin} alt="Image of a coin" />
                  </HeaderGold>
                </TertiaryInfoBox>
                <ButtonIcon
                  onClick={() => {
                    toggleMenu();
                    console.log("click");
                  }}
                >
                  <Icon src={exitIcon} alt="Exit" />
                </ButtonIcon>
              </MenuHeaderItems>
            </MenuHeader>
            <MenuBody>
              <ButtonLarge
                onClick={() => {
                  goToLocation("/");
                }}
              >
                Home
              </ButtonLarge>
              <ButtonLarge
                onClick={() => {
                  goToLocation("/training");
                }}
              >
                Training
              </ButtonLarge>
              <ButtonLarge
                onClick={() => {
                  goToLocation("/cats");
                }}
              >
                Cats
              </ButtonLarge>
              <ButtonLarge
                onClick={() => {
                  goToLocation("/map");
                }}
              >
                Map
              </ButtonLarge>
              <ButtonLarge
                onClick={() => {
                  goToLocation("/library");
                }}
              >
                Library
              </ButtonLarge>
              <ButtonLarge
                onClick={() => {
                  goToLocation("/shop");
                }}
              >
                Shop
              </ButtonLarge>
            </MenuBody>
          </MenuContainer>
        </MenuBackground>
      )}
    </>
  );
};
