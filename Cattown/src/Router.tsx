import { createBrowserRouter } from "react-router-dom";
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

const getSavefile = async () => {
  const savefile = await loadSavefile("6570cf4ecc414f15b7acade0");
  console.log(savefile);
  return savefile ? savefile : {};
};

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      { path: "/login", element: <Login></Login> },
      {
        path: "/",
        element: <Home></Home>,
        loader: getSavefile,
        index: true,
      },
      {
        path: "/options",
        element: <Options></Options>,
        loader: getSavefile,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
        loader: getSavefile,
      },
      {
        path: "/map",
        element: <Map></Map>,
        loader: getSavefile,
      },
      {
        path: "/cats",
        element: <Cats></Cats>,
        loader: getSavefile,
      },
      {
        path: "/training",
        element: <Training></Training>,
        loader: getSavefile,
      },
      {
        path: "/library",
        element: <Library></Library>,
        loader: getSavefile,
      },
    ],
  },
]);
