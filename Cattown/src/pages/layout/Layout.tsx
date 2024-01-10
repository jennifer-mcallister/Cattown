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

  const checkToken = async () => {
    if (loggedInUser) {
      const tokenResult = await loggedInUser.getIdTokenResult();

      const expirationTime = new Date(tokenResult.expirationTime).getTime();
      const currentTime = new Date().getTime();
      const timeDifference = expirationTime - currentTime;

      if (timeDifference < 5 * 60 * 1000) {
        const refreshedToken = await loggedInUser.getIdToken(true);
        console.log("refreshed token", refreshedToken);
      }
    }
  };

  if (!loggedInUser) {
    throw new Error("UnAuthorized");
  }
  if (loggedInUser) {
    checkToken();
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
              strength:
                countOutCatLevel(catFinnished.xp) > catFinnished.level
                  ? catFinnished.strength + catFinnished.level * 2
                  : catFinnished.strength,
              health:
                countOutCatLevel(catFinnished.xp) > catFinnished.level
                  ? catFinnished.health + catFinnished.level * 10
                  : catFinnished.health,
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
