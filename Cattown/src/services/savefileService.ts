import axios from "axios";
import { ISavefile } from "../types/savefileTypes";

export const loadSavefile = async (savefileId: string) => {
  try {
    const res = await axios.get<ISavefile>(
      `http://localhost:5000/api/v1/cattown/savefiles/load/${savefileId}`
    );
    return res.data;
  } catch {
    throw new Error("Could not get savefile from api");
  }
};
