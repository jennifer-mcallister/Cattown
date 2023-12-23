import { useLoaderData, useOutletContext } from "react-router-dom";
import { ShopItem } from "../components/ShopItem";
import { MainContent } from "../components/styled/LayoutStyle";
import {
  ShopItemContainer,
  ShopItemHeader,
  ShopItemImg,
  ShopItemInfo,
  ShopItemInfoContainer,
  ShopMenuContainer,
  ShopMenuItemsContainer,
} from "../components/styled/ShopMenu";
import { useEffect, useState } from "react";
import { IRelic } from "../types/savefileTypes";
import placeholder from "../assets/cat_placeholder.png";
import { defaultCat } from "../models/Cat";
import { ButtonMedium } from "../components/styled/Button";
import { ILayoutContext } from "./layout/Layout";
import { buyCats } from "../services/CatService";

export const Shop = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const data: IRelic[] = useLoaderData() as IRelic[];
  const [relics, setRelics] = useState<IRelic[]>(data);

  const userHasRelic = (relic: IRelic, userRelic: IRelic) => {
    return relic.name === userRelic.name;
  };

  useEffect(() => {
    const showRelics: IRelic[] = relics.filter(
      (relic) =>
        !outletContext.savefile.relics.some((userRelic) =>
          userHasRelic(relic, userRelic)
        )
    );

    setRelics(showRelics);
  }, [outletContext.savefile.relics]);

  const buyCat = async () => {
    try {
      const cat = { ...defaultCat, id: Date.now().toString() };
      const updatedCats = [...outletContext.savefile.cats, cat];
      const goldLeft = outletContext.savefile.gold - 75;
      await buyCats(updatedCats, goldLeft);
    } catch {
      throw new Error("Something when wrong");
    }
  };
  return (
    <>
      <MainContent>
        <h1>Witches Shop</h1>
        <h2>You have {outletContext.savefile.gold} gold to spend</h2>
        <ShopMenuContainer>
          <ShopMenuItemsContainer>
            {relics.map((relic) => (
              <ShopItem
                relic={relic}
                userRelics={outletContext.savefile.relics || []}
                key={relic.name}
                userGold={outletContext.savefile.gold || 0}
              />
            ))}
            <ShopItemContainer>
              <ShopItemHeader>
                <h3>Mystery Cat</h3>
              </ShopItemHeader>
              <ShopItemInfo>
                <ShopItemImg src={placeholder} />
                <ShopItemInfoContainer>
                  <h2>?</h2>
                </ShopItemInfoContainer>
                <ShopItemInfoContainer>
                  <ButtonMedium
                    disabled={
                      outletContext.savefile.gold < 75 ||
                      outletContext.savefile.cats.length >= 4
                    }
                    onClick={() => {
                      buyCat();
                    }}
                  >
                    75$
                  </ButtonMedium>
                </ShopItemInfoContainer>
              </ShopItemInfo>
            </ShopItemContainer>
          </ShopMenuItemsContainer>
        </ShopMenuContainer>
      </MainContent>
    </>
  );
};
