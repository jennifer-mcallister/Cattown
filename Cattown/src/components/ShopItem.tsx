import { IRelic, IStats } from "../types/savefileTypes";
import {
  ShopItemContainer,
  ShopItemHeader,
  ShopItemImg,
  ShopItemInfo,
  ShopItemInfoContainer,
} from "./styled/ShopMenu";
import placeholder from "../assets/placeholder.png";
import { TextMedium, TextSmall } from "./styled/Text";
import { ButtonMedium } from "./styled/Button";
import { buyRelics } from "../services/RelicsService";
import { updateStats } from "../services/StatsService";

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
    <ShopItemContainer>
      <ShopItemHeader>
        <h3>{relic.name}</h3>
      </ShopItemHeader>
      <ShopItemInfo>
        <ShopItemImg src={placeholder} />
        <ShopItemInfoContainer>
          <TextMedium>Resistance:</TextMedium>
          <TextSmall>Shadow: {relic.stats.shadowRes}%</TextSmall>
          <TextSmall>Fire: {relic.stats.fireRes}%</TextSmall>
          <TextSmall>Water: {relic.stats.waterRes}%</TextSmall>
          <TextSmall>Nature: {relic.stats.natureRes}%</TextSmall>
        </ShopItemInfoContainer>
        <ShopItemInfoContainer>
          <ButtonMedium
            disabled={userGold < relic.cost}
            onClick={() => {
              buyItem();
            }}
          >
            ${relic.cost}
          </ButtonMedium>
        </ShopItemInfoContainer>
      </ShopItemInfo>
    </ShopItemContainer>
  );
};
