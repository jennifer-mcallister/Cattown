import { HomeContent, MainContent } from "../components/styled/LayoutStyle";
import {
  HomeContainerDesktop,
  HomeContainerMobile,
} from "../components/styled/Container";
import { HomeInfoContainer } from "../components/styled/HomeNav";
import shop from "/assets/shop.webp";
import map from "/assets/map.webp";
import library from "/assets/library.webp";
import cats from "/assets/cats.webp";
import training from "/assets/training.webp";
import { HeaderBig, TextMedium } from "../components/styled/Text";
import { useEffect, useState } from "react";
import { ButtonMedium } from "../components/styled/Button";
import { QuestMenuBackground } from "../components/styled/Quest";
import {
  catColor,
  libraryColor,
  mapColor,
  trainingColor,
} from "../components/styled/theme_variables/colors";
import { IconLarge } from "../components/IconLarge";

export const Home = () => {
  const [showNewPlayerInfo, setShowNewPlayerInfo] = useState(
    localStorage.getItem("newPlayer")?.toString() || "true"
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const startGame = () => {
    setShowNewPlayerInfo("false");
    localStorage.setItem("newPlayer", "false");
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
      <HomeContent>
        {windowWidth < 769 && (
          <HomeContainerMobile>
            <IconLarge
              hoverColor={trainingColor}
              img={training}
              locationPath={"training"}
            />
            <IconLarge hoverColor={catColor} img={cats} locationPath={"cats"} />
            <IconLarge hoverColor={mapColor} img={map} locationPath={"map"} />
            <IconLarge
              hoverColor={libraryColor}
              img={library}
              locationPath={"library"}
            />
            <IconLarge
              hoverColor={trainingColor}
              img={shop}
              locationPath={"shop"}
            />
          </HomeContainerMobile>
        )}
        {windowWidth > 768 && (
          <>
            <HomeContainerDesktop>
              <IconLarge
                hoverColor={trainingColor}
                img={training}
                locationPath={"training"}
              />
              <IconLarge
                hoverColor={catColor}
                img={cats}
                locationPath={"cats"}
              />
              <IconLarge hoverColor={mapColor} img={map} locationPath={"map"} />
            </HomeContainerDesktop>
            <HomeContainerDesktop>
              <IconLarge
                hoverColor={libraryColor}
                img={library}
                locationPath={"library"}
              />
              <IconLarge
                hoverColor={trainingColor}
                img={shop}
                locationPath={"shop"}
              />
            </HomeContainerDesktop>
          </>
        )}
      </HomeContent>
    </MainContent>
  );
};
