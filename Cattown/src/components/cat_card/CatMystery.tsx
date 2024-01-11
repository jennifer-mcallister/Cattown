import { useState } from "react";
import { ButtonLarge } from "../styled/Button";
import { CatDivider, CatTextContainer } from "../styled/Cat";
import { HeaderCoinImg } from "../styled/HeaderStyle";
import {
  ShopItemContainer,
  ShopItemContent,
  ShopItemFooter,
  ShopItemInfoContainer,
  ShopItemLeftBox,
  ShopItemRelicImg,
  ShopItemRightBox,
} from "../styled/ShopMenu";
import { HeaderSmall, TextMedium, TextSmall } from "../styled/Text";
import mysteryCat from "/assets/mystery_cat.webp";
import coin from "/assets/coin.webp";

interface ICatMysteryProps {
  userGold: number;
  numberOfCatsOwned: number;
  showModule: boolean;
  buyCat: () => void;
}

export const CatMystery = ({
  userGold,
  numberOfCatsOwned,
  showModule,
  buyCat,
}: ICatMysteryProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoading = () => {
    setImgLoaded(true);
  };
  return (
    <ShopItemContainer className={imgLoaded ? "loaded" : ""}>
      <ShopItemContent>
        <ShopItemLeftBox>
          <HeaderSmall>Mystery Cat</HeaderSmall>
          <ShopItemInfoContainer>
            <TextMedium>Stats</TextMedium>
            <CatDivider />
            <CatTextContainer>
              <TextSmall>Health</TextSmall>
              <TextSmall>?</TextSmall>
            </CatTextContainer>
            <CatTextContainer>
              <TextSmall>Strength</TextSmall>
              <TextSmall>?</TextSmall>
            </CatTextContainer>
          </ShopItemInfoContainer>
        </ShopItemLeftBox>
        <ShopItemRightBox>
          <ShopItemRelicImg
            src={mysteryCat}
            onLoad={handleLoading}
            alt="Image of a mystery cat"
          />
        </ShopItemRightBox>
      </ShopItemContent>
      <ShopItemFooter>
        <ButtonLarge
          disabled={userGold < 75 || numberOfCatsOwned >= 4 || showModule}
          onClick={buyCat}
        >
          75
          <HeaderCoinImg src={coin} alt="Image of a coin" />
        </ButtonLarge>
      </ShopItemFooter>
    </ShopItemContainer>
  );
};
