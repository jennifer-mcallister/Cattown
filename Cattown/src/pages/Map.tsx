import { useLoaderData, useOutletContext } from "react-router-dom";
import { MainContent, MapContent } from "../components/styled/LayoutStyle";
import { ILayoutContext } from "./layout/Layout";
import { MapOverviewContainer } from "../components/styled/MapStyle";
import { IBoss, IMission } from "../types/missionTypes";
import { MapZone } from "../components/map/MapZone";
import { HeaderBig } from "../components/styled/Text";

export interface IQuests {
  missions: IMission[];
  bosses: IBoss[];
}

export const Map = () => {
  const outletContext = useOutletContext<ILayoutContext>();
  const quests = useLoaderData() as IQuests;

  const showMissionsForZone = (zone: string) => {
    const missions: IMission[] = quests.missions.filter((mission) => {
      if (mission.zone === zone) {
        return mission;
      }
    });
    return missions;
  };

  const showBossForZone = (zone: string) => {
    const boss: IBoss = quests.bosses.find(
      (boss) => boss.zone === zone
    ) as IBoss;
    return boss;
  };

  return (
    <>
      <MainContent>
        <HeaderBig>Catland</HeaderBig>
        <MapContent>
          <MapOverviewContainer>
            <MapZone
              zone={"woods"}
              missions={showMissionsForZone("woods")}
              boss={showBossForZone("woods")}
              cats={outletContext.savefile.cats}
              userStats={outletContext.savefile.stats}
              uniqueItems={outletContext.savefile.uniqueItems}
            />
            <MapZone
              zone={"theCity"}
              missions={showMissionsForZone("theCity")}
              boss={showBossForZone("theCity")}
              cats={outletContext.savefile.cats}
              userStats={outletContext.savefile.stats}
              uniqueItems={outletContext.savefile.uniqueItems}
            />

            <MapZone
              zone={"swamp"}
              missions={showMissionsForZone("swamp")}
              boss={showBossForZone("swamp")}
              cats={outletContext.savefile.cats}
              userStats={outletContext.savefile.stats}
              uniqueItems={outletContext.savefile.uniqueItems}
            />
            <MapZone
              zone={"cave"}
              missions={showMissionsForZone("cave")}
              boss={showBossForZone("cave")}
              cats={outletContext.savefile.cats}
              userStats={outletContext.savefile.stats}
              uniqueItems={outletContext.savefile.uniqueItems}
            />
          </MapOverviewContainer>
        </MapContent>
      </MainContent>
    </>
  );
};
