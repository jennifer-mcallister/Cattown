import { useOutletContext } from "react-router-dom";
import { MainContent } from "../components/styled/LayoutStyle";
import { ILayoutContext } from "./layout/Layout";
import { TextMedium } from "../components/styled/Text";

export const Library = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  return (
    <>
      <MainContent>
        <h1>Library</h1>
        <h2>{outletContext.savefile.username}</h2>
        <TextMedium>gold: {outletContext.savefile.gold}</TextMedium>
        <TextMedium>health: {outletContext.savefile.stats.health}%</TextMedium>
        <TextMedium>
          crit chance: {outletContext.savefile.stats.critChance}%
        </TextMedium>
        <TextMedium>luck: {outletContext.savefile.stats.luck}%</TextMedium>
        <TextMedium>
          strength: {outletContext.savefile.stats.strength}%
        </TextMedium>
        <h2>Resistance:</h2>
        <TextMedium>
          shadow: {outletContext.savefile.stats.shadowRes}%
        </TextMedium>
        <TextMedium>fire: {outletContext.savefile.stats.fireRes}%</TextMedium>
        <TextMedium>water: {outletContext.savefile.stats.waterRes}%</TextMedium>
        <TextMedium>
          nature: {outletContext.savefile.stats.natureRes}%
        </TextMedium>
        <h2>Relics</h2>
        {outletContext.savefile.relics.map((relic) => (
          <TextMedium key={relic.name}>{relic.name}</TextMedium>
        ))}
      </MainContent>
    </>
  );
};
