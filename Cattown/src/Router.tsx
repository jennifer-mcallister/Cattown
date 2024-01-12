import { Outlet, createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/layout/Layout";
import { Login } from "./pages/Login";
import { Shop } from "./pages/Shop";
import { Map } from "./pages/Map";
import { Cats } from "./pages/Cats";
import { Training } from "./pages/Training";
import { Library } from "./pages/Library";
import { Error } from "./pages/Error";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Reset } from "./pages/Reset";
import { getRelics } from "./services/RelicsService";
import { getQuests } from "./services/MissionService";
import { RequireAuth } from "./RequireAuth";

const loadRelics = async () => {
  const relics = await getRelics();
  return relics;
};

const loadQuests = async () => {
  const quests = await getQuests();
  return quests;
};

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet></Outlet>,
    id: "account",
    children: [
      {
        path: "/login",
        element: <Login></Login>,
        id: "login",
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
    element: (
      <RequireAuth>
        <Layout></Layout>
      </RequireAuth>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        id: "home",
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/shop",
        id: "shop",
        element: <Shop></Shop>,
        loader: loadRelics,
      },
      {
        path: "/map",
        id: "map",
        element: <Map></Map>,
        loader: loadQuests,
      },
      {
        path: "/cats",
        id: "cats",
        element: <Cats></Cats>,
      },
      {
        path: "/training",
        id: "training",
        element: <Training></Training>,
        // loader: get trainings
      },
      {
        path: "/library",
        id: "library",
        element: <Library></Library>,
      },
    ],
  },
]);
