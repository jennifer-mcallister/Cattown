import { useState } from "react";
import { GameMenu } from "../../components/GameMenu";
import { HeaderContent } from "../../components/styled/LayoutStyled";
import { GameMenuButton } from "../../components/styled/GameMenuStyled";
import {
  HeaderSmallContainer,
  HeaderGold,
} from "../../components/styled/HeaderStyled";
import { useMatches, useNavigate, useRouteLoaderData } from "react-router-dom";
import { ISavefile } from "../../types/savefileTypes";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const routes = useMatches();
  const loaderSavefile = useRouteLoaderData(routes[1].id) as ISavefile;

  const navigate = useNavigate();

  return (
    <HeaderContent>
      <HeaderSmallContainer>
        <HeaderGold>{loaderSavefile.gold} GOLD</HeaderGold>
        <GameMenuButton onClick={() => navigate("/")}>Home</GameMenuButton>
      </HeaderSmallContainer>

      <h1>Cattown in progress..</h1>
      <HeaderSmallContainer>
        <GameMenuButton onClick={() => navigate("/options")}>
          Options
        </GameMenuButton>
        <GameMenuButton onClick={() => setShowMenu(!showMenu)}>
          Menu
        </GameMenuButton>
      </HeaderSmallContainer>
      <GameMenu toggleMenu={toggleMenu} show={showMenu} />
    </HeaderContent>
  );
};
