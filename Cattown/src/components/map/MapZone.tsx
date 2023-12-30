import { useEffect, useState } from "react";
import { IBoss, IMission } from "../../types/missionTypes";
import { ICat, IStats } from "../../types/savefileTypes";
import { MapOverviewImg, MapOverviewLocation } from "../styled/MapStyle";
import { TextMedium } from "../styled/Text";
import placeholder from "../../assets/placeholder.png";
import { QuestsMenu } from "./QuestsMenu";
import { useOutletContext } from "react-router-dom";
import { ILayoutContext } from "../../pages/layout/Layout";

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

  const toggleShowQuests = () => {
    setShowQuests(!showQuests);
  };

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

  return (
    <>
      <MapOverviewLocation onClick={toggleShowQuests}>
        <MapOverviewImg src={placeholder} />
        <TextMedium>{zone}</TextMedium>
        <TextMedium>
          Level {zoneLevel}-{zoneLevel + 5}
        </TextMedium>
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
        />
      )}
    </>
  );
};
