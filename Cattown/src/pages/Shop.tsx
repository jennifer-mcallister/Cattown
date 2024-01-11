import { useLoaderData, useOutletContext } from "react-router-dom";
import { ShopItem } from "../components/ShopItem";
import { MainContent, ShopContent } from "../components/styled/LayoutStyle";
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
import { HeaderBig } from "../components/styled/Text";
import { throwD20 } from "../helpers/gameCalculationHelpers";
import { MysteryCatModule } from "../components/MysteryCatModule";
import { CatMystery } from "../components/cat_card/CatMystery";

export const Shop = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const relics: IRelic[] = useLoaderData() as IRelic[];
  const [availableRelics, setAvailableRelics] = useState<IRelic[]>(relics);
  const [showModule, setShowModule] = useState(false);
  const [randomizedCat, setRandomizedCat] = useState<ICat>(defaultCat);

  const toggleMysteryCatModule = () => {
    setShowModule(!showModule);
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
      setShowModule(true);
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
      {showModule && (
        <MysteryCatModule
          toggleShowModule={toggleMysteryCatModule}
          randomizedCat={randomizedCat}
        />
      )}
      <MainContent>
        <PageHeaderContainer>
          <HeaderBig>Bobben's shop</HeaderBig>
        </PageHeaderContainer>
        <ShopContent>
          <CatMystery
            userGold={outletContext.savefile.gold}
            numberOfCatsOwned={outletContext.savefile.cats.length}
            showModule={showModule}
            buyCat={buyCat}
          />
          {relics.map((relic) => (
            <ShopItem
              key={relic.name}
              relic={relic}
              availableRelics={availableRelics}
              userRelics={outletContext.savefile.relics || []}
              userGold={outletContext.savefile.gold || 0}
              userStats={outletContext.savefile.stats}
            />
          ))}
        </ShopContent>
      </MainContent>
    </>
  );
};
