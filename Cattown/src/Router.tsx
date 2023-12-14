import { Outlet, createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { Login } from "./pages/Login";
import { Options } from "./pages/Options";
import { Shop } from "./pages/Shop";
import { Map } from "./pages/Map";
import { Cats } from "./pages/Cats";
import { Training } from "./pages/Training";
import { Library } from "./pages/Library";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { loadSavefile } from "./services/savefileService";
import { SignUp } from "./pages/account/SignUp";
import { Reset } from "./pages/account/Reset";
import { NewPassword } from "./pages/account/NewPassword";

const getSavefile = async () => {
  const savefileId: string = localStorage.getItem("savefileId") || "";
  const savefile = await loadSavefile(savefileId);
  return savefile ? savefile : {};
};

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet></Outlet>,
    id: "account",
    children: [
      {
        path: "/",
        element: <Login></Login>,
        id: "login",
        index: true,
      },
      {
        path: "/account/signup",
        element: <SignUp></SignUp>,
        id: "signup",
      },
      {
        path: "/account/reset",
        element: <Reset></Reset>,
        id: "reset",
      },
      {
        path: "/account/reset/:userId",
        element: <NewPassword></NewPassword>,
        id: "newPassword",
      },
    ],
  },
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/home",
        id: "home",
        element: <Home></Home>,
        loader: getSavefile,
      },
      {
        path: "/options",
        id: "options",
        element: <Options></Options>,
        loader: getSavefile,
      },
      {
        path: "/shop",
        id: "shop",
        element: <Shop></Shop>,
        loader: getSavefile,
      },
      {
        path: "/map",
        id: "map",
        element: <Map></Map>,
        loader: getSavefile,
      },
      {
        path: "/cats",
        id: "cats",
        element: <Cats></Cats>,
        loader: getSavefile,
      },
      {
        path: "/training",
        id: "training",
        element: <Training></Training>,
        loader: getSavefile,
      },
      {
        path: "/library",
        id: "library",
        element: <Library></Library>,
        loader: getSavefile,
      },
    ],
  },
]);
