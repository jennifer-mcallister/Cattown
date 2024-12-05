import { IRelic, ISavefile } from "../types/savefileTypes";
import { updateLocalStorage } from "./LSService";
import { relics } from "../data/relics";

export const getRelics = async () => {
  try {
    return relics;
  } catch {
    throw new Error("Unable to retreive data");
  }
};

export const buyRelics = async (
  relics: IRelic[],
  goldLeft: number,
  savefile: ISavefile
) => {
  try {
    const updatedSavefile: ISavefile = {
      ...savefile,
      relics: relics,
      gold: goldLeft,
    };
    updateLocalStorage(updatedSavefile);
  } catch {
    throw new Error("Unable to update localstorage");
  }
};
