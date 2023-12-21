import { Dispatch, createContext } from "react";
import { IActionCats } from "../reducers/CatsReducers";

export const CatsDispatchContext = createContext<Dispatch<IActionCats>>(() => {
  return;
});
