import { Dispatch, SetStateAction } from "react";
import { GameMenu } from "../../components/GameMenu";
import { HeaderContent } from "../../components/styled/LayoutStyle";
import {
  HeaderSmallContainer,
  HeaderGold,
} from "../../components/styled/HeaderStyle";
import { useNavigate } from "react-router-dom";
import { OptionsMenu } from "../../components/OptionsMenu";
import { IShowMenus } from "./Layout";
import { ButtonMedium } from "../../components/styled/Button";

interface IHeaderProps {
  userGold: number;
  username: string;
  showMenus: IShowMenus;
  setShowMenus: Dispatch<SetStateAction<IShowMenus>>;
}

export const Header = ({
  userGold,
  username,
  showMenus,
  setShowMenus,
}: IHeaderProps) => {
  const toggleMenu = () => {
    setShowMenus({ ...showMenus, showMenu: !showMenus.showMenu });
  };

  const toggleOptions = () => {
    setShowMenus({ ...showMenus, showOptions: !showMenus.showOptions });
  };

  const navigate = useNavigate();

  return (
    <HeaderContent>
      <HeaderSmallContainer>
        <HeaderGold>{userGold} GOLD</HeaderGold>
        <ButtonMedium onClick={() => navigate("/home")}>Home</ButtonMedium>
      </HeaderSmallContainer>

      <h1>
        Welcome Mayor {username}! Cattown is currently under development..
      </h1>
      <HeaderSmallContainer>
        <ButtonMedium onClick={() => toggleOptions()}>Options</ButtonMedium>
        <ButtonMedium onClick={() => toggleMenu()}>Menu</ButtonMedium>
      </HeaderSmallContainer>
      <GameMenu
        toggleMenu={toggleMenu}
        show={showMenus.showMenu}
        usergold={userGold}
      />
      <OptionsMenu toggleOptions={toggleOptions} show={showMenus.showOptions} />
    </HeaderContent>
  );
};
