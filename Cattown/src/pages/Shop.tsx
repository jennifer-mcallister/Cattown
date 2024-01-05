import { useLoaderData, useOutletContext } from "react-router-dom";
import { ShopItem } from "../components/ShopItem";
import { MainContent, ShopContent } from "../components/styled/LayoutStyle";
import {
  ShopItemContainer,
  ShopItemContent,
  ShopItemFooter,
  ShopItemInfoContainer,
  ShopItemLeftBox,
  ShopItemRelicImg,
  ShopItemRightBox,
} from "../components/styled/ShopMenu";
import { useEffect, useState } from "react";
import { IRelic } from "../types/savefileTypes";
import { defaultCat } from "../models/Cat";
import { ILayoutContext } from "./layout/Layout";
import { buyCats } from "../services/CatService";
import { PageHeaderContainer } from "../components/styled/Container";
import {
  HeaderBig,
  HeaderSmall,
  TextMedium,
  TextSmall,
} from "../components/styled/Text";
import { CatDivider, CatTextContainer } from "../components/styled/Cat";
import { ButtonLarge } from "../components/styled/Button";
import mysteryCat from "/assets/mystery_cat.png";
import coin from "/assets/coin.png";
import { HeaderCoinImg } from "../components/styled/HeaderStyle";

export const Shop = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const data: IRelic[] = useLoaderData() as IRelic[];
  const [relics, setRelics] = useState<IRelic[]>(data);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoading = () => {
    setImgLoaded(true);
  };

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
        <PageHeaderContainer>
          <HeaderBig>Bobben's shop</HeaderBig>
        </PageHeaderContainer>
        <ShopContent>
          {relics.map((relic) => (
            <ShopItem
              relic={relic}
              userRelics={outletContext.savefile.relics || []}
              key={relic.name}
              userGold={outletContext.savefile.gold || 0}
              userStats={outletContext.savefile.stats}
            />
          ))}
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
                disabled={
                  outletContext.savefile.gold < 75 ||
                  outletContext.savefile.cats.length >= 4
                }
                onClick={() => {
                  buyCat();
                }}
              >
                75
                <HeaderCoinImg
                  src={coin}
                  onLoad={handleLoading}
                  alt="Image of a coin"
                />
              </ButtonLarge>
            </ShopItemFooter>
          </ShopItemContainer>
          {/* <ShopItemContainer>
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
            </ShopItemContainer> */}
        </ShopContent>
      </MainContent>
    </>
  );
};
