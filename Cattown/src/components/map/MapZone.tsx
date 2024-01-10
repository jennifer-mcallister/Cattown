import { useEffect, useState } from "react";
import { IBoss, IMission } from "../../types/missionTypes";
import { ICat, IStats } from "../../types/savefileTypes";
import {
  MapHoverContainer,
  MapOverviewImg,
  MapOverviewLocation,
} from "../styled/MapStyle";
import { QuestsMenu } from "./QuestsMenu";
import { useOutletContext } from "react-router-dom";
import { ILayoutContext } from "../../pages/layout/Layout";
import { HeaderSmall, TextSmallBold } from "../styled/Text";
import { Winner } from "../Winner";

interface IMapZoneProps {
  zone: string;
  missions: IMission[];
  boss: IBoss;
  cats: ICat[];
  userStats: IStats;
  uniqueItems: number[];
}

export const MapZone = ({
  zone,
  missions,
  boss,
  cats,
  userStats,
  uniqueItems,
}: IMapZoneProps) => {
  const outletContext = useOutletContext<ILayoutContext>();
  const [showQuests, setShowQuests] = useState(false);
  const [bossDead, setBossDead] = useState(false);
  const [zoneLevel, setZoneLevel] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgPath = `/assets/map_${zone}.png`;
  const [showLevelCap, setShowLevelCap] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showPlayerWon, setShowPlayerWon] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    switch (zone) {
      case "woods":
        setZoneLevel(1);
        break;
      case "cave":
        setZoneLevel(5);
        break;
      case "swamp":
        setZoneLevel(10);
        break;
      case "theCity":
        setZoneLevel(15);
    }
  });

  useEffect(() => {
    setBossDead(
      outletContext.savefile.uniqueItems.find(
        (uniqueItems) => uniqueItems === boss.mcguffinId
      )
        ? true
        : false
    );
  }, [outletContext]);

  const handleLoading = () => {
    setImgLoaded(true);
  };

  const toggleShowQuests = () => {
    setShowQuests(!showQuests);
  };

  const toggleShowWinner = () => {
    setShowPlayerWon(!showPlayerWon);
  };

  return (
    <>
      <MapOverviewLocation
        onClick={toggleShowQuests}
        className={imgLoaded ? "loaded" : ""}
      >
        <MapOverviewImg
          src={imgPath}
          onLoad={handleLoading}
          alt="Image of a forest"
          onMouseEnter={() => {
            setShowLevelCap(true);
          }}
          onMouseLeave={() => {
            setShowLevelCap(false);
          }}
        />
        {windowWidth < 769 && (
          <MapHoverContainer>
            <HeaderSmall>{zone}</HeaderSmall>
            <TextSmallBold>
              lvl. {zoneLevel} - {zoneLevel + 5}
            </TextSmallBold>
          </MapHoverContainer>
        )}
        {showLevelCap && (
          <MapHoverContainer>
            <HeaderSmall>{zone}</HeaderSmall>
            <TextSmallBold>
              lvl. {zoneLevel} - {zoneLevel + 5}
            </TextSmallBold>
          </MapHoverContainer>
        )}
      </MapOverviewLocation>
      {showQuests && (
        <QuestsMenu
          zone={zone}
          zoneLevel={zoneLevel}
          missions={missions}
          boss={boss}
          bossDead={bossDead}
          cats={cats}
          userStats={userStats}
          uniqueItems={uniqueItems}
          toggleShowQuests={toggleShowQuests}
          toggleShowWinner={toggleShowWinner}
        />
      )}
      {showPlayerWon && <Winner toggleShowWinner={toggleShowWinner} />}
    </>
  );
};
