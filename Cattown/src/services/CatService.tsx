import { ICat, ISavefile } from "../types/savefileTypes";
import { updateLocalStorage } from "./LSService";

export const updateCats = async (cats: ICat[], savefile: ISavefile) => {
  try {
    const updatedSavefile: ISavefile = {
      ...savefile,
      cats: cats,
    };
    updateLocalStorage(updatedSavefile);
  } catch {
    throw new Error("Unable to update localstorage");
  }
};

export const buyCats = async (
  cats: ICat[],
  goldLeft: number,
  savefile: ISavefile
) => {
  try {
    const updatedSavefile: ISavefile = {
      ...savefile,
      cats: cats,
      gold: goldLeft,
    };
    updateLocalStorage(updatedSavefile);
  } catch {
    throw new Error("Unable to update localstorage");
  }
};
