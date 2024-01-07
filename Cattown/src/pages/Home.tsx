import { MainContent } from "../components/styled/LayoutStyle";
import "@pixi/events";
import { HomeContainer } from "../components/styled/Container";
import {
  HomeInfoContainer,
  HomeNavContainer,
  HomeNavHeader,
  HomeNavImg,
} from "../components/styled/HomeNav";
import shop from "/assets/shop.png";
import map from "/assets/map.png";
import library from "/assets/library.png";
import cats from "/assets/cats.png";
import training from "/assets/training.png";
import { useNavigate } from "react-router-dom";
import { HeaderBig, TextMedium } from "../components/styled/Text";
import { useState } from "react";
import { ButtonMedium } from "../components/styled/Button";
import { QuestMenuBackground } from "../components/styled/Quest";

export const Home = () => {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showNewPlayerInfo, setShowNewPlayerInfo] = useState(
    localStorage.getItem("newPlayer")?.toString() || "true"
  );

  const startGame = () => {
    setShowNewPlayerInfo("false");
    localStorage.setItem("newPlayer", "false");
  };

  const handleLoading = () => {
    setImgLoaded(true);
  };

  return (
    <MainContent>
      {showNewPlayerInfo === "true" && (
        <QuestMenuBackground>
          <HomeInfoContainer>
            <HeaderBig>Cattown</HeaderBig>
            <TextMedium>
              Embark on a quest in Catland, train your cats, defeat the four
              bosses and collect valuable Relics to enhance your stats and
              improve your odds of victory in Cattown. After vanquishing a boss,
              you'll obtain a distinctive McGuffin. Gather all four to safeguard
              your town.
            </TextMedium>
            <ButtonMedium onClick={startGame}>Start game</ButtonMedium>
          </HomeInfoContainer>
        </QuestMenuBackground>
      )}

      <HomeContainer>
        <HomeNavContainer className={imgLoaded ? "loaded" : ""}>
          <HomeNavImg
            src={training}
            alt="Image of a cat training"
            onLoad={handleLoading}
            onClick={() => {
              navigate("/training");
            }}
          />
          <HomeNavHeader>
            <TextMedium>Training</TextMedium>
          </HomeNavHeader>
        </HomeNavContainer>
        <HomeNavContainer className={imgLoaded ? "loaded" : ""}>
          <HomeNavImg
            src={cats}
            alt="Image of a cats"
            onLoad={handleLoading}
            onClick={() => {
              navigate("/cats");
            }}
          />
          <HomeNavHeader>
            <TextMedium>Cats</TextMedium>
          </HomeNavHeader>
        </HomeNavContainer>
        <HomeNavContainer className={imgLoaded ? "loaded" : ""}>
          <HomeNavImg
            src={map}
            alt="Image of a map"
            onLoad={handleLoading}
            onClick={() => {
              navigate("/map");
            }}
          />
          <HomeNavHeader>
            <TextMedium>Map</TextMedium>
          </HomeNavHeader>
        </HomeNavContainer>
      </HomeContainer>
      <HomeContainer>
        <HomeNavContainer className={imgLoaded ? "loaded" : ""}>
          <HomeNavImg
            src={library}
            alt="Image of a magic book"
            onLoad={handleLoading}
            onClick={() => {
              navigate("/library");
            }}
          />
          <HomeNavHeader>
            <TextMedium>Library</TextMedium>
          </HomeNavHeader>
        </HomeNavContainer>
        <HomeNavContainer className={imgLoaded ? "loaded" : ""}>
          <HomeNavImg
            src={shop}
            alt="Image of a cat holding a bag of money"
            onLoad={handleLoading}
            onClick={() => {
              navigate("/shop");
            }}
          />
          <HomeNavHeader>
            <TextMedium>Bobbens Shop</TextMedium>
          </HomeNavHeader>
        </HomeNavContainer>
      </HomeContainer>
    </MainContent>
  );
};
