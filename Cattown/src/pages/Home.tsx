import { MainContent } from "../components/styled/LayoutStyle";
import "@pixi/events";
import { HomeContainer } from "../components/styled/Container";
import {
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
import { TextMedium } from "../components/styled/Text";
import { useState } from "react";

export const Home = () => {
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleLoading = () => {
    setImgLoaded(true);
  };

  return (
    <MainContent>
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
