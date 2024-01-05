import { IRelic, IStats } from "../types/savefileTypes";
import {
  ShopItemContainer,
  ShopItemContent,
  ShopItemFooter,
  ShopItemInfoContainer,
  ShopItemLeftBox,
  ShopItemRelicImg,
  ShopItemRightBox,
} from "./styled/ShopMenu";
import { HeaderSmall, TextMedium, TextSmall } from "./styled/Text";
import { ButtonLarge } from "./styled/Button";
import { buyRelics } from "../services/RelicsService";
import { updateStats } from "../services/StatsService";
import { useState } from "react";
import { HeaderCoinImg } from "./styled/HeaderStyle";
import coin from "/assets/coin.png";
import { CatDivider, CatTextContainer } from "./styled/Cat";

interface IShopItemProps {
  relic: IRelic;
  userGold: number;
  userRelics: IRelic[];
  userStats: IStats;
}

export const ShopItem = ({
  relic,
  userGold,
  userRelics,
  userStats,
}: IShopItemProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgPath = `/assets/${relic.name}.png`;

  const handleLoading = () => {
    setImgLoaded(true);
  };

  const buyItem = async () => {
    try {
      const updatedStats = {
        ...userStats,
        fireRes: userStats.fireRes + relic.stats.fireRes,
        waterRes: userStats.waterRes + relic.stats.waterRes,
        shadowRes: userStats.shadowRes + relic.stats.shadowRes,
        natureRes: userStats.natureRes + relic.stats.natureRes,
      };
      const updatedRelics = [...userRelics, relic];
      const goldLeft = userGold - relic.cost;
      await buyRelics(updatedRelics, goldLeft);
      await updateStats(updatedStats);
    } catch {
      throw new Error("Something when wrong");
    }
  };
  return (
    <ShopItemContainer className={imgLoaded ? "loaded" : ""}>
      <ShopItemContent>
        <ShopItemLeftBox>
          <HeaderSmall>{relic.name.replace(/_/g, " ")}</HeaderSmall>
          <ShopItemInfoContainer>
            <TextMedium>Resistence</TextMedium>
            <CatDivider />
            <CatTextContainer>
              <TextSmall>Shadow</TextSmall>
              <TextSmall>{relic.stats.shadowRes}%</TextSmall>
            </CatTextContainer>
            <CatTextContainer>
              <TextSmall>Fire</TextSmall>
              <TextSmall>{relic.stats.fireRes}%</TextSmall>
            </CatTextContainer>
            <CatTextContainer>
              <TextSmall>Water</TextSmall>
              <TextSmall>{relic.stats.waterRes}%</TextSmall>
            </CatTextContainer>
            <CatTextContainer>
              <TextSmall>Nature</TextSmall>
              <TextSmall>{relic.stats.natureRes}%</TextSmall>
            </CatTextContainer>
          </ShopItemInfoContainer>
        </ShopItemLeftBox>
        <ShopItemRightBox>
          <ShopItemRelicImg
            src={imgPath}
            onLoad={handleLoading}
            alt="Image of a relic"
          />
        </ShopItemRightBox>
      </ShopItemContent>
      <ShopItemFooter>
        <ButtonLarge
          disabled={userGold < relic.cost}
          onClick={() => {
            buyItem();
          }}
        >
          {relic.cost}
          <HeaderCoinImg
            src={coin}
            onLoad={handleLoading}
            alt="Image of a coin"
          />
        </ButtonLarge>
      </ShopItemFooter>
    </ShopItemContainer>
  );
};
