import { useLoaderData, useOutletContext } from "react-router-dom";
import { ShopItem } from "../components/ShopItem";
import { MainContent, ShopContent } from "../components/styled/LayoutStyle";
import {
  RevealCatContainer,
  RevealCatImg,
  RevealCatStats,
  RevealCatSubTitle,
  RevealCatTitle,
  ShopItemContainer,
  ShopItemContent,
  ShopItemFooter,
  ShopItemInfoContainer,
  ShopItemLeftBox,
  ShopItemRelicImg,
  ShopItemRightBox,
} from "../components/styled/ShopMenu";
import { useEffect, useState } from "react";
import { ICat, IRelic } from "../types/savefileTypes";
import {
  commonCat,
  defaultCat,
  legendaryCat,
  rareCat,
  uncommonCat,
} from "../models/Cat";
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
import { ButtonLarge, ButtonMedium } from "../components/styled/Button";
import mysteryCat from "/assets/mystery_cat.webp";
import placeholder from "/assets/cat_white.webp";
import coin from "/assets/coin.webp";
import { HeaderCoinImg } from "../components/styled/HeaderStyle";
import { BoughtItemBackground } from "../components/styled/Menu";
import { throwD20 } from "../helpers/gameCalculationHelpers";

export const Shop = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const relics: IRelic[] = useLoaderData() as IRelic[];
  const [availableRelics, setAvailableRelics] = useState<IRelic[]>(relics);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [revealImgLoaded, setRevealImgLoaded] = useState(false);
  const [boughtCat, setBoughtCat] = useState(false);
  const [randomizedCat, setRandomizedCat] = useState<ICat>(defaultCat);
  const imgPath = `/assets/${randomizedCat.img}`;

  const handleRevealLoading = () => {
    setRevealImgLoaded(true);
  };

  const handleLoading = () => {
    setImgLoaded(true);
  };

  const userHasRelic = (relic: IRelic, userRelic: IRelic) => {
    return relic.name === userRelic.name;
  };

  useEffect(() => {
    const showRelics: IRelic[] = availableRelics.filter(
      (relic) =>
        !outletContext.savefile.relics.some((userRelic) =>
          userHasRelic(relic, userRelic)
        )
    );

    setAvailableRelics(showRelics);
  }, [outletContext.savefile.relics]);

  const rollNewCat = () => {
    const diceRoll = throwD20();
    if (diceRoll < 9) {
      setRandomizedCat(commonCat);
      return commonCat;
    }
    if (diceRoll > 8 && diceRoll < 15) {
      setRandomizedCat(uncommonCat);
      return uncommonCat;
    }
    if (diceRoll > 14 && diceRoll < 18) {
      setRandomizedCat(rareCat);
      return rareCat;
    }
    if (diceRoll > 17 && diceRoll < 20) {
      setRandomizedCat(legendaryCat);
      return legendaryCat;
    }
    return commonCat;
  };

  const buyCat = async () => {
    try {
      setBoughtCat(true);
      const cat = { ...rollNewCat(), id: Date.now().toString() };
      const updatedCats = [...outletContext.savefile.cats, cat];
      const goldLeft = outletContext.savefile.gold - 75;
      await buyCats(updatedCats, goldLeft);
    } catch {
      throw new Error("Something when wrong");
    }
  };

  return (
    <>
      {boughtCat && (
        <BoughtItemBackground
          show={"true"}
          onClick={() => {
            setBoughtCat(false);
          }}
        >
          <RevealCatContainer className={revealImgLoaded ? "loaded" : ""}>
            <RevealCatTitle>
              {randomizedCat.rarity ? randomizedCat.rarity : ""}
            </RevealCatTitle>
            <RevealCatSubTitle>{randomizedCat.name}</RevealCatSubTitle>
            <RevealCatImg
              src={randomizedCat.img ? imgPath : placeholder}
              onLoad={handleRevealLoading}
              alt="Image of a cat"
            />
            <RevealCatStats>Health: {randomizedCat.health}</RevealCatStats>
            <RevealCatStats>Strength: {randomizedCat.strength}</RevealCatStats>
            <ButtonMedium
              onClick={() => {
                setBoughtCat(false);
              }}
            >
              Back to shop
            </ButtonMedium>
          </RevealCatContainer>
        </BoughtItemBackground>
      )}
      <MainContent>
        <PageHeaderContainer>
          <HeaderBig>Bobben's shop</HeaderBig>
        </PageHeaderContainer>
        <ShopContent>
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
                  outletContext.savefile.cats.length >= 4 ||
                  boughtCat
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
          {relics.map((relic) => (
            <ShopItem
              relic={relic}
              availableRelics={availableRelics}
              userRelics={outletContext.savefile.relics || []}
              key={relic.name}
              userGold={outletContext.savefile.gold || 0}
              userStats={outletContext.savefile.stats}
            />
          ))}
        </ShopContent>
      </MainContent>
    </>
  );
};
