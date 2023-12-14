import { useNavigate, useRouteLoaderData } from "react-router";
import { NavigationIconSmall } from "./NavigationIconSmall";
import {
  GameMenuButton,
  GameMenuContainer,
  GameMenuContent,
  GameMenuGold,
  GameMenuHeader,
} from "./styled/GameMenuStyled";
import { ISavefile } from "../types/savefileTypes";
import { useMatches } from "react-router-dom";

interface IGameMenuProps {
  toggleMenu: () => void;
  show: boolean;
}

export const GameMenu = ({ toggleMenu, show }: IGameMenuProps) => {
  const routes = useMatches();
  const loaderSavefile = useRouteLoaderData(routes[1].id) as ISavefile;

  const navigate = useNavigate();

  return (
    <GameMenuContainer show={show.toString()}>
      <GameMenuHeader>
        <GameMenuGold>{loaderSavefile.gold} GOLD</GameMenuGold>
        <GameMenuButton
          onClick={() => {
            navigate("/options");
          }}
        >
          Options
        </GameMenuButton>
        <GameMenuButton
          onClick={() => {
            toggleMenu();
          }}
        >
          X
        </GameMenuButton>
      </GameMenuHeader>
      <GameMenuContent>
        <NavigationIconSmall path={"/home"} />
        <NavigationIconSmall path={"/training"} />
        <NavigationIconSmall path={"/cats"} />
        <NavigationIconSmall path={"/map"} />
        <NavigationIconSmall path={"/library"} />
        <NavigationIconSmall path={"/shop"} />
      </GameMenuContent>
    </GameMenuContainer>
  );
};
