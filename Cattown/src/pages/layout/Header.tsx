import { Dispatch, SetStateAction } from "react";
import { GameMenu } from "../../components/GameMenu";
import { HeaderContent } from "../../components/styled/LayoutStyle";
import {
  HeaderSmallContainer,
  HeaderGold,
} from "../../components/styled/HeaderStyle";
import { useMatches, useNavigate, useRouteLoaderData } from "react-router-dom";
import { ISavefile } from "../../types/savefileTypes";
import { OptionsMenu } from "../../components/OptionsMenu";
import { IShowMenus } from "./Layout";
import { ButtonMedium } from "../../components/styled/Button";

interface IHeaderProps {
  showMenus: IShowMenus;
  setShowMenus: Dispatch<SetStateAction<IShowMenus>>;
}

export const Header = ({ showMenus, setShowMenus }: IHeaderProps) => {
  const toggleMenu = () => {
    setShowMenus({ ...showMenus, showMenu: !showMenus.showMenu });
  };

  const toggleOptions = () => {
    setShowMenus({ ...showMenus, showOptions: !showMenus.showOptions });
  };

  const routes = useMatches();
  const loaderSavefile = useRouteLoaderData(routes[1].id) as ISavefile;
  const navigate = useNavigate();

  return (
    <HeaderContent>
      <HeaderSmallContainer>
        <HeaderGold>{loaderSavefile.gold} GOLD</HeaderGold>
        <ButtonMedium onClick={() => navigate("/home")}>Home</ButtonMedium>
      </HeaderSmallContainer>

      <h1>
        Welcome Mayor {loaderSavefile.username}! Cattown is currently under
        development..
      </h1>
      <HeaderSmallContainer>
        <ButtonMedium onClick={() => toggleOptions()}>Options</ButtonMedium>
        <ButtonMedium onClick={() => toggleMenu()}>Menu</ButtonMedium>
      </HeaderSmallContainer>
      <GameMenu toggleMenu={toggleMenu} show={showMenus.showMenu} />
      <OptionsMenu toggleOptions={toggleOptions} show={showMenus.showOptions} />
    </HeaderContent>
  );
};
