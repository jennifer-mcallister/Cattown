import { useNavigate } from "react-router";
import {
  MenuBackground,
  MenuBody,
  MenuContainer,
  MenuHeader,
  MenuHeaderItems,
} from "./styled/Menu";
import { ButtonLarge, ButtonMedium } from "./styled/Button";
import { HeaderGold } from "./styled/HeaderStyle";

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
    <MenuBackground show={show.toString()}>
      <MenuContainer>
        <MenuHeader>
          <MenuHeaderItems>
            <HeaderGold>{usergold} GOLD</HeaderGold>
            <h2>Menu</h2>
            <ButtonMedium
              onClick={() => {
                toggleMenu();
              }}
            >
              X
            </ButtonMedium>
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
  );
};
