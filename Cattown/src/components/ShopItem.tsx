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
import { useEffect, useState } from "react";
import { HeaderCoinImg } from "./styled/HeaderStyle";
import coin from "/assets/coin.webp";
import { CatDivider, CatTextContainer } from "./styled/Cat";
import { ILayoutContext } from "../pages/layout/Layout";
import { useOutletContext } from "react-router-dom";

interface IShopItemProps {
  relic: IRelic;
  availableRelics: IRelic[];
  userGold: number;
  userRelics: IRelic[];
  userStats: IStats;
}

export const ShopItem = ({
  relic,
  availableRelics,
  userGold,
  userRelics,
  userStats,
}: IShopItemProps) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgPath = `/assets/${relic.name}.webp`;
  const [boughtItem, setBoughtItem] = useState(false);
  const [available, setAvailable] = useState(true);
  const outletContext = useOutletContext<ILayoutContext>();

  useEffect(() => {
    const isRelicAvailable = availableRelics.some(
      (rel) => rel.name === relic.name
    );
    setAvailable(isRelicAvailable);
  }, [availableRelics]);

  const handleLoading = () => {
    setImgLoaded(true);
  };

  const buyItem = () => {
    setBoughtItem(true);
    const updatedStats: IStats = {
      ...userStats,
      fireRes: userStats.fireRes + relic.stats.fireRes,
      waterRes: userStats.waterRes + relic.stats.waterRes,
      shadowRes: userStats.shadowRes + relic.stats.shadowRes,
      natureRes: userStats.natureRes + relic.stats.natureRes,
    };
    const updatedRelics = [...userRelics, relic];
    const goldLeft = userGold - relic.cost;
    buyRelics(updatedRelics, goldLeft, updatedStats, outletContext.savefile);
  };
  return (
    <>
      <ShopItemContainer
        className={`${imgLoaded ? "loaded" : ""}${
          boughtItem ? " bought-item" : ""
        }`}
      >
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
            disabled={userGold < relic.cost || !available}
            onClick={() => {
              buyItem();
            }}
          >
            {available ? `${relic.cost}` : `In Library`}
            {available ? (
              <HeaderCoinImg
                src={coin}
                onLoad={handleLoading}
                alt={"Image of a coin"}
              />
            ) : (
              ""
            )}
          </ButtonLarge>
        </ShopItemFooter>
      </ShopItemContainer>
    </>
  );
};
