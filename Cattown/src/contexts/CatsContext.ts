import { createContext } from "react";
import { ICat } from "../types/savefileTypes";

export const CatsContext = createContext<ICat[]>([]);
