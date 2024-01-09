import { Dispatch, SetStateAction } from "react";
import { GameMenu } from "../../components/GameMenu";
import { HeaderContent } from "../../components/styled/LayoutStyle";
import {
  HeaderSmallContainer,
  HeaderGold,
  HeaderCoinImg,
} from "../../components/styled/HeaderStyle";
import { useNavigate } from "react-router-dom";
import { OptionsMenu } from "../../components/OptionsMenu";
import { IShowMenus } from "./Layout";
import { ButtonIcon } from "../../components/styled/Button";
import { HeaderSmall } from "../../components/styled/Text";
import coin from "/assets/coin.png";
import homeIcon from "/assets/icons/home.png";
import optionsIcon from "/assets/icons/settings.png";
import menuIcon from "/assets/icons/menu.png";
import { Icon } from "../../components/styled/Icon";
import { TertiaryInfoBox } from "../../components/styled/Quest";

interface IHeaderProps {
  userGold: number;
  username: string;
  showMenus: IShowMenus;
  setShowMenus: Dispatch<SetStateAction<IShowMenus>>;
}

export const Header = ({ userGold, showMenus, setShowMenus }: IHeaderProps) => {
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
        <ButtonIcon onClick={() => navigate("/")}>
          <Icon src={homeIcon} alt="Home" />
        </ButtonIcon>
        <TertiaryInfoBox>
          <HeaderGold>
            <HeaderSmall>{userGold}</HeaderSmall>
            <HeaderCoinImg src={coin} alt="Image of a coin" />
          </HeaderGold>
        </TertiaryInfoBox>
      </HeaderSmallContainer>
      <HeaderSmallContainer>
        <ButtonIcon onClick={() => toggleOptions()}>
          <Icon src={optionsIcon} alt="Options" />
        </ButtonIcon>
        <ButtonIcon onClick={() => toggleMenu()}>
          <Icon src={menuIcon} alt="Menu" />
        </ButtonIcon>
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
