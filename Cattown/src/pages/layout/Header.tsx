import { Dispatch, SetStateAction } from "react";
import { GameMenu } from "../../components/menus/GameMenu";
import { HeaderContent } from "../../components/styled/LayoutStyle";
import {
  HeaderSmallContainer,
  HeaderGold,
  HeaderCoinImg,
} from "../../components/styled/HeaderStyle";
import { useNavigate } from "react-router-dom";
import { OptionsMenu } from "../../components/menus/OptionsMenu";
import { IShowMenus } from "./Layout";
import { ButtonIcon } from "../../components/styled/Button";
import { HeaderSmall } from "../../components/styled/Text";
import coin from "/assets/coin.webp";
import homeIcon from "/assets/icons/home.png";
import optionsIcon from "/assets/icons/settings.png";
import menuIcon from "/assets/icons/menu.png";
import { Icon } from "../../components/styled/Icon";
import { TertiaryInfoBox } from "../../components/styled/Quest";
import { Notification } from "../../components/Notification";
import { ICat, ISavefile } from "../../types/savefileTypes";
import { NotificationContainer } from "../../components/styled/NotificationStyle";
import { updateGold } from "../../services/SavefileService";

interface IHeaderProps {
  userGold: number;
  showMenus: IShowMenus;
  cats: ICat[];
  setShowMenus: Dispatch<SetStateAction<IShowMenus>>;
  savefile: ISavefile;
}

export const Header = ({
  userGold,
  showMenus,
  cats,
  setShowMenus,
  savefile,
}: IHeaderProps) => {
  const toggleMenu = () => {
    console.log("toggle menu", showMenus.showMenu);
    setShowMenus({ ...showMenus, showMenu: !showMenus.showMenu });
  };

  const toggleOptions = () => {
    setShowMenus({ ...showMenus, showOptions: !showMenus.showOptions });
  };

  const navigate = useNavigate();

  const addOneCoin = () => {
    updateGold(userGold + 1, savefile);
  };

  return (
    <HeaderContent>
      <HeaderSmallContainer>
        <ButtonIcon onClick={() => navigate("/")}>
          <Icon src={homeIcon} alt="Home" />
        </ButtonIcon>
        <TertiaryInfoBox>
          <HeaderGold onClick={addOneCoin}>
            <HeaderSmall>{userGold}</HeaderSmall>
            <HeaderCoinImg src={coin} alt="Image of a coin" />
          </HeaderGold>
        </TertiaryInfoBox>
      </HeaderSmallContainer>
      <NotificationContainer>
        {cats.map((cat) => (
          <Notification cat={cat} key={cat.id} />
        ))}
      </NotificationContainer>

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
