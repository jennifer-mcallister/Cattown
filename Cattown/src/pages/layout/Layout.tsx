import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import { auth, db } from "../../services/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { ICat, ISavefile } from "../../types/savefileTypes";
import { defaultSavefile } from "../../models/Savefile";
import { updateCats } from "../../services/CatService";
import {
  ITimeLeft,
  countOutCatLevel,
  countOutTimeLeft,
} from "../../helpers/gameCalculationHelpers";
import { updateGold } from "../../services/SavefileService";

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

  const loggedInUser = auth.currentUser;
  if (!loggedInUser) {
    throw new Error("UnAuthorized");
  }
  const savefileRef = doc(db, "savefiles", loggedInUser.uid);

  useEffect(() => {
    onSnapshot(savefileRef, (savefile) => {
      setLayoutContext({
        ...layoutContext,
        savefile: savefile.data() as ISavefile,
      });
    });
  }, []);

  useEffect(() => {
    const updateCatFinnished = async (catFinnished: ICat) => {
      try {
        const updatedCats = [...layoutContext.savefile.cats].map((cat) => {
          if (cat.id === catFinnished.id) {
            return {
              ...catFinnished,
              level: countOutCatLevel(catFinnished.xp),
              strength: countOutCatLevel(catFinnished.xp) * 2,
              health: countOutCatLevel(catFinnished.xp) * 10,
            };
          } else {
            return cat;
          }
        });

        await updateCats(updatedCats);
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
          if (timeInMilliseconds < 10) {
            updateCatFinnished({
              ...cat,
              status: "in camp",
              xp: cat.xp + cat.trainingXp,
            });
          }
          const timeLeft: ITimeLeft = countOutTimeLeft(timeInMilliseconds);
          return { ...cat, trainingTimeLeft: timeLeft };
        }
        if (cat.status === "on mission") {
          const timeInMilliseconds = cat.missionEndTime - new Date().getTime();
          if (timeInMilliseconds < 10) {
            updateSavefileGold(cat.missionGold);
            updateCatFinnished({
              ...cat,
              status: "in camp",
              xp: cat.xp + cat.missionXp,
              missionGold: 0,
            });
          }
          const timeLeft: ITimeLeft = countOutTimeLeft(timeInMilliseconds);
          return { ...cat, missionTimeLeft: timeLeft };
        }
        if (cat.status === "downed") {
          const timeInMilliseconds = cat.downedEndTime - new Date().getTime();
          if (timeInMilliseconds < 10) {
            updateCatFinnished({
              ...cat,
              status: "in camp",
              xp: cat.xp,
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
        username={layoutContext.savefile.username}
        showMenus={showMenus}
        setShowMenus={setShowMenus}
      ></Header>
      <Outlet context={layoutContext}></Outlet>
    </>
  );
};
