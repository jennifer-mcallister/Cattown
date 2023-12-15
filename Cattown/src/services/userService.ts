import axios from "axios";
import {
  IUserLogin,
  IUserRegister,
  IUserSubmitNewPassword,
} from "../types/userTypes";

export interface ILoginResponse {
  savefileId: string;
}

export const login = async (user: IUserLogin) => {
  try {
    const res = await axios.post<ILoginResponse>(
      `https://cattown-behind-the-scene.netlify.app/api/v1/cattown/login`,
      user
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.status.toString());
      }
    }
    throw new Error("503 Service Unavailable");
  }
};

export const register = async (user: IUserRegister) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/v1/cattown/register`,
      user
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.status.toString());
      }
    }
    throw new Error("503 Service Unavailable");
  }
};

export const forgottPassword = async (mail: string) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/v1/cattown/forgott-password`,
      { mail: mail }
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.status.toString());
      }
    }
    throw new Error("503 Service Unavailable");
  }
};

export const submitNewPassword = async (user: IUserSubmitNewPassword) => {
  try {
    const res = await axios.post(
      `http://localhost:5000/api/v1/cattown/reset-password`,
      user
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.status.toString());
      }
    }
    throw new Error("503 Service Unavailable");
  }
};
