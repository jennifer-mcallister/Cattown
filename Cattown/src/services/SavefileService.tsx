import { defaultSavefileTest } from "../models/Savefile";
import { updateLocalStorage } from "./LSService";
import { ISavefile } from "../types/savefileTypes";

export const updateGold = async (gold: number, savefile: ISavefile) => {
  try {
    const updatedSavefile: ISavefile = {
      ...savefile,
      gold: gold,
    };
    updateLocalStorage(updatedSavefile);
  } catch {
    throw new Error("Unable to update localstorage");
  }
};

export const updateUniqueItems = async (
  uniqueItems: number[],
  savefile: ISavefile
) => {
  try {
    const updatedSavefile: ISavefile = {
      ...savefile,
      uniqueItems: uniqueItems,
    };
    updateLocalStorage(updatedSavefile);
  } catch {
    throw new Error("Unable to update localstorage");
  }
};

export const resetSavefile = async () => {
  try {
    updateLocalStorage(defaultSavefileTest);
  } catch {
    throw new Error("Unable to update localstorage");
  }
};
