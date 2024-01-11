import { useState } from "react";
import { ButtonMedium } from "./styled/Button";
import { BoughtItemBackground } from "./styled/Menu";
import {
  RevealCatContainer,
  RevealCatImg,
  RevealCatStats,
  RevealCatSubTitle,
  RevealCatTitle,
} from "./styled/ShopMenu";
import { ICat } from "../types/savefileTypes";
import placeholder from "/assets/cat_white.webp";

interface IMysteryCatModule {
  toggleShowModule: () => void;
  randomizedCat: ICat;
}
export const MysteryCatModule = ({
  toggleShowModule,
  randomizedCat,
}: IMysteryCatModule) => {
  const [revealImgLoaded, setRevealImgLoaded] = useState(false);
  const imgPath = `/assets/${randomizedCat.img}`;

  const handleRevealLoading = () => {
    setRevealImgLoaded(true);
  };
  return (
    <BoughtItemBackground onClick={toggleShowModule}>
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
        <ButtonMedium onClick={toggleShowModule}>Back to shop</ButtonMedium>
      </RevealCatContainer>
    </BoughtItemBackground>
  );
};
