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

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      { path: "/", element: <Home></Home>, index: true },
      { path: "/login", element: <Login></Login> },
      { path: "/options", element: <Options></Options> },
      { path: "/shop", element: <Shop></Shop> },
      { path: "/map", element: <Map></Map> },
      { path: "/cats", element: <Cats></Cats> },
      { path: "/training", element: <Training></Training> },
      { path: "/library", element: <Library></Library> },
    ],
  },
]);
