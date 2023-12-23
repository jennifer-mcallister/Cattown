import { IRelic } from "../types/savefileTypes";
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

interface IShopItemProps {
  relic: IRelic;
  userGold: number;
  userRelics: IRelic[];
}

export const ShopItem = ({ relic, userGold, userRelics }: IShopItemProps) => {
  const buyItem = async () => {
    try {
      const updatedRelics = [...userRelics, relic];
      const goldLeft = userGold - relic.cost;
      await buyRelics(updatedRelics, goldLeft);
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
