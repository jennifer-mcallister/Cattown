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
import { SignUp } from "./pages/account/SignUp";
import { Reset } from "./pages/account/Reset";
import { getSavefile } from "./services/Firebase";

const loadSavefile = async () => {
  const savefile = await getSavefile();
  return savefile;
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
        loader: loadSavefile,
      },
      {
        path: "/options",
        id: "options",
        element: <Options></Options>,
        loader: loadSavefile,
      },
      {
        path: "/shop",
        id: "shop",
        element: <Shop></Shop>,
        loader: loadSavefile,
      },
      {
        path: "/map",
        id: "map",
        element: <Map></Map>,
        loader: loadSavefile,
      },
      {
        path: "/cats",
        id: "cats",
        element: <Cats></Cats>,
        loader: loadSavefile,
      },
      {
        path: "/training",
        id: "training",
        element: <Training></Training>,
        loader: loadSavefile,
      },
      {
        path: "/library",
        id: "library",
        element: <Library></Library>,
        loader: loadSavefile,
      },
    ],
  },
]);
