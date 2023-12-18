import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { useState } from "react";

export interface IShowMenus {
  showMenu: boolean;
  showOptions: boolean;
}

export const Layout = () => {
  const [showMenus, setShowMenus] = useState<IShowMenus>({
    showMenu: false,
    showOptions: false,
  });

  return (
    <>
      <Header showMenus={showMenus} setShowMenus={setShowMenus}></Header>
      <Outlet context={showMenus}></Outlet>
    </>
  );
};
