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

  useEffect(() => {
    const handleLocalStorageUpdated = () => {
      setLayoutContext((prevContext) => ({
        ...prevContext,
        savefile: getLocalStorage() as ISavefile,
      }));
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

  useEffect(() => {
    const updateCatFinnished = async (catFinnished: ICat) => {
      const updatedCats = [...layoutContext.savefile.cats].map((cat) => {
        if (cat.id === catFinnished.id) {
          return {
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
        } else {
          return cat;
        }
      });
      try {
        await updateCats(updatedCats, layoutContext.savefile);
      } catch {
        throw new Error("Something when wrong");
      }
    };

    const updateSavefileGold = async (goldReceived: number) => {
      try {
        await updateGold(layoutContext.savefile.gold + goldReceived);
      } catch {
        throw new Error("Something when wrong");
      }
    };

    const countTimeLeft = setInterval(() => {
      const updatedCats = [...layoutContext.savefile.cats].map((cat) => {
        if (cat.status === "training") {
          const timeInMilliseconds = cat.trainingEndTime - new Date().getTime();
          if (timeInMilliseconds < 900) {
            updateCatFinnished({
              ...cat,
              status: "in camp",
              xp: cat.xp + cat.trainingXp,
              trainingTimeLeft: {
                h: 0,
                min: 0,
                sec: 0,
              },
            });
          }
          const timeLeft: ITimeLeft = countOutTimeLeft(timeInMilliseconds);
          return { ...cat, trainingTimeLeft: timeLeft };
        }
        if (cat.status === "on mission") {
          const timeInMilliseconds = cat.missionEndTime - new Date().getTime();
          if (timeInMilliseconds < 900) {
            updateSavefileGold(cat.missionGold);
            updateCatFinnished({
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
          }
          const timeLeft: ITimeLeft = countOutTimeLeft(timeInMilliseconds);
          return { ...cat, missionTimeLeft: timeLeft };
        }
        if (cat.status === "downed") {
          const timeInMilliseconds = cat.downedEndTime - new Date().getTime();
          if (timeInMilliseconds < 900) {
            updateCatFinnished({
              ...cat,
              status: "in camp",
              xp: cat.xp,
              downedTimeLeft: {
                h: 0,
                min: 0,
                sec: 0,
              },
            });
          }
          const timeLeft: ITimeLeft = countOutTimeLeft(timeInMilliseconds);
          return { ...cat, downedTimeLeft: timeLeft };
        }
        return cat;
      });
      setLayoutContext({
        ...layoutContext,
        savefile: { ...layoutContext.savefile, cats: updatedCats },
      });
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
      ></Header>
      <Outlet context={layoutContext}></Outlet>
    </>
  );
};
