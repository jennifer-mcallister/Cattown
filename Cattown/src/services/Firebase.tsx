import * as firebase from "firebase/app";
import "firebase/firestore";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { IUserLogin, IUserRegister } from "../types/userTypes";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ISavefile } from "../types/savefileTypes";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESS_SEND_ID,
  appId: import.meta.env.VITE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const savefilesCollection = collection(db, "savefiles");

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

export const setSavefile = async () => {};

export const registerUser = async (user: IUserRegister) => {
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const newSavefile: ISavefile = {
      username: user.username,
      gold: 0,
      stats: {
        luck: 1,
        health: 1,
        strength: 1,
        fireDamage: 1,
        waterDamage: 1,
        shadowDamage: 1,
        natureDamage: 1,
      },
      uniqueItems: [],
      relics: [],
      cats: [],
    };

    const newSavefileDoc = doc(savefilesCollection, cred.user.uid);
    await setDoc(newSavefileDoc, newSavefile);
  } catch {
    throw new Error("503 Service Unavailable");
  }
};

export const loginUser = async (user: IUserLogin) => {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password);
    console.log("User logged in");
  } catch {
    throw new Error("503 Service Unavailable");
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch {
    console.log("503 Service Unavailable");
  }
};

export const resetPassword = async (email: string) => {
  try {
    sendPasswordResetEmail(auth, email);
    console.log("Reset password email sent");
  } catch {
    throw new Error("503 Service Unavailable");
  }
};
