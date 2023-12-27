import { doc, updateDoc } from "firebase/firestore";
import { ICat } from "../types/savefileTypes";
import { auth, db } from "./Firebase";

export const updateCats = async (cats: ICat[]) => {
  try {
    const loggedInUser = await auth.currentUser;

    if (!loggedInUser) {
      throw new Error("UnAuthorized");
    }

    const savefileRef = doc(db, "savefiles", loggedInUser.uid);
    await updateDoc(savefileRef, { cats: cats });
    console.log("Cats updated");
  } catch {
    throw new Error("503 Service Unavailable");
  }
};

export const buyCats = async (cats: ICat[], goldLeft: number) => {
  try {
    const loggedInUser = await auth.currentUser;

    if (!loggedInUser) {
      throw new Error("UnAuthorized");
    }

    const savefileRef = doc(db, "savefiles", loggedInUser.uid);
    await updateDoc(savefileRef, { cats: cats, gold: goldLeft });
    console.log("Cats updated");
  } catch {
    throw new Error("503 Service Unavailable");
  }
};
