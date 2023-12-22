import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";
import { auth, db, defaultSavefile } from "../../services/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { ISavefile } from "../../types/savefileTypes";

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

  return (
    <>
      <Header showMenus={showMenus} setShowMenus={setShowMenus}></Header>
      <Outlet context={layoutContext}></Outlet>
    </>
  );
};
