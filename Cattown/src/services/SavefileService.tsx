import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./config/Firebase";
import { newGameSavefile } from "../models/Savefile";

export const getSavefile = async () => {
  try {
    const loggedInUser = await auth.currentUser;

    if (!loggedInUser) {
      throw new Error("UnAuthorized");
    }

    const savefileRef = doc(db, "savefiles", loggedInUser.uid);
    const savefile = (await getDoc(savefileRef)).data();
    return savefile;
  } catch {
    throw new Error("503 Service Unavailable");
  }
};

export const updateGold = async (gold: number) => {
  try {
    const loggedInUser = await auth.currentUser;

    if (!loggedInUser) {
      throw new Error("UnAuthorized");
    }

    const savefileRef = doc(db, "savefiles", loggedInUser.uid);
    await updateDoc(savefileRef, { gold: gold });
    console.log("Gold is updated");
  } catch {
    throw new Error("503 Service Unavailable");
  }
};

export const updateUniqueItems = async (uniqueItems: number[]) => {
  try {
    const loggedInUser = await auth.currentUser;

    if (!loggedInUser) {
      throw new Error("UnAuthorized");
    }

    const savefileRef = doc(db, "savefiles", loggedInUser.uid);
    await updateDoc(savefileRef, { uniqueItems: uniqueItems });
    console.log("Unique items is updated");
  } catch {
    throw new Error("503 Service Unavailable");
  }
};

export const resetSavefile = async () => {
  try {
    const loggedInUser = await auth.currentUser;

    if (!loggedInUser) {
      throw new Error("UnAuthorized");
    }

    const savefileRef = doc(db, "savefiles", loggedInUser.uid);
    await updateDoc(savefileRef, { ...newGameSavefile });
    console.log("Savefiles reset to default");
  } catch {
    throw new Error("503 Service Unavailable");
  }
};
