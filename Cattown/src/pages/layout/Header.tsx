import { useState } from "react";
import { GameMenu } from "../../components/GameMenu";
import { HeaderContent } from "../../components/styled/LayoutStyled";
import { GameMenuButton } from "../../components/styled/GameMenuStyled";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <HeaderContent>
      <h1>Cattown in progress..</h1>
      <GameMenuButton onClick={() => setShowMenu(!showMenu)}>
        Menu
      </GameMenuButton>
      <GameMenu toggleMenu={toggleMenu} show={showMenu} />
    </HeaderContent>
  );
};
