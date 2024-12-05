import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import { useEffect } from "react";
import { ICat, ISavefile } from "../../types/savefileTypes";
import { defaultSavefile } from "../../models/Savefile";

import { updateGold } from "../../services/SavefileService";
import {
  countOutCatLevel,
  countOutHealth,
  countOutStrength,
} from "../../helpers/levelingSystem";
import { ITimeLeft, countOutTimeLeft } from "../../helpers/timeManagement";
import { getLocalStorage } from "../../services/LSService";
import { updateCats } from "../../services/CatService";

export interface IShowMenus {
  showMenu: boolean;
  showOptions: boolean;
}

export interface ILayoutContext {
  showMenu: IShowMenus;
  savefile: ISavefile;
}

export const Layout = () => {
  const [showMenus, setShowMenus] = useState<IShowMenus>({
    showMenu: false,
    showOptions: false,
  });

  const [layoutContext, setLayoutContext] = useState<ILayoutContext>({
    showMenu: showMenus,
    savefile: { ...defaultSavefile, username: "" },
  });

  const [addGold, setAddGold] = useState(false);
  const [missionGold, setMissionGold] = useState(0);

  useEffect(() => {
    const handleLocalStorageUpdated = () => {
      const LS = getLocalStorage() as ISavefile;

      setLayoutContext((prevContext) => {
        const updatedContext = {
          ...prevContext,
          savefile: LS,
        };
        return updatedContext;
      });
    };

    // Add event listener for the custom "localstorageupdated" event
    window.addEventListener(
      "LSUpdated",
      handleLocalStorageUpdated as EventListener
    );

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener(
        "LSUpdated",
        handleLocalStorageUpdated as EventListener
      );
    };
  }, []);

  useEffect(() => {
    setLayoutContext((prevContext) => ({
      ...prevContext,
      savefile: getLocalStorage() as ISavefile,
    }));
  }, []);

  const updateCatFinnished = (catFinnished: ICat): ICat => {
    const updatedCat = {
      ...catFinnished,
      level: countOutCatLevel(catFinnished.xp),
      strength:
        countOutCatLevel(catFinnished.xp) > catFinnished.level
          ? countOutStrength({
              rarity: catFinnished.rarity || "",
              level: countOutCatLevel(catFinnished.xp),
            })
          : catFinnished.strength,
      health:
        countOutCatLevel(catFinnished.xp) > catFinnished.level
          ? countOutHealth({
              rarity: catFinnished.rarity || "",
              level: countOutCatLevel(catFinnished.xp),
            })
          : catFinnished.health,
    };
    return updatedCat;
  };

  const updateSavefileGold = (goldReceived: number) => {
    updateGold(
      layoutContext.savefile.gold + goldReceived,
      layoutContext.savefile
    );
  };

  useEffect(() => {
    const countTimeLeft = setInterval(() => {
      const updatedCats = [...layoutContext.savefile.cats].map((cat) => {
        if (cat.status === "training") {
          const timeInMilliseconds = cat.trainingEndTime - new Date().getTime();

          if (timeInMilliseconds < 900) {
            return updateCatFinnished({
              ...cat,
              status: "in camp",
              xp: cat.xp + cat.trainingXp,
              trainingTimeLeft: {
                h: 0,
                min: 0,
                sec: 0,
              },
            });
          } else {
            const timeLeft: ITimeLeft = countOutTimeLeft(timeInMilliseconds);
            return { ...cat, trainingTimeLeft: timeLeft };
          }
        }
        if (cat.status === "on mission") {
          const timeInMilliseconds = cat.missionEndTime - new Date().getTime();
          if (timeInMilliseconds < 900) {
            setAddGold(true);
            setMissionGold(missionGold + cat.missionGold);
            return updateCatFinnished({
              ...cat,
              status: "in camp",
              xp: cat.xp + cat.missionXp,
              missionGold: 0,
              missionTimeLeft: {
                h: 0,
                min: 0,
                sec: 0,
              },
            });
          } else {
            const timeLeft: ITimeLeft = countOutTimeLeft(timeInMilliseconds);
            return { ...cat, missionTimeLeft: timeLeft };
          }
        }
        if (cat.status === "downed") {
          const timeInMilliseconds = cat.downedEndTime - new Date().getTime();
          if (timeInMilliseconds < 900) {
            return updateCatFinnished({
              ...cat,
              status: "in camp",
              xp: cat.xp,
              downedTimeLeft: {
                h: 0,
                min: 0,
                sec: 0,
              },
            });
          } else {
            const timeLeft: ITimeLeft = countOutTimeLeft(timeInMilliseconds);
            return { ...cat, downedTimeLeft: timeLeft };
          }
        }
        return cat;
      });

      updateCats(updatedCats, layoutContext.savefile);
      if (addGold) {
        updateSavefileGold(missionGold);
        setMissionGold(0);
        setAddGold(false);
      }
    }, 1000);
    return () => clearInterval(countTimeLeft);
  }, [layoutContext]);

  return (
    <>
      <Header
        userGold={layoutContext.savefile.gold}
        cats={layoutContext.savefile.cats}
        showMenus={showMenus}
        setShowMenus={setShowMenus}
        savefile={layoutContext.savefile}
      ></Header>
      <Outlet context={layoutContext}></Outlet>
    </>
  );
};
