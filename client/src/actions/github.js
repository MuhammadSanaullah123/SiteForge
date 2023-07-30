import axios from "axios";
import { GET_ACCESS_TOKEN, GET_USER_DATA } from "./types";

// Get Access Token of user
export const getAccessToken = async (codeParams) => {
  try {
    return await axios.get(
      `http://127.0.0.1:5000/api/github/getAccessToken?code=${codeParams}`
    );
  } catch (error) {
    console.error(error);
  }
};

// Get Access Token of user
export const getUserData = async (accessToken) => {
  try {
    return await axios.get(`http://127.0.0.1:5000/api/github/getUserData`, {
      headers: {
        Authorization: `Bearer ${accessToken}`, //Bearer ACCESS_TOKEN
      },
    });
  } catch (error) {
    console.error(error);
  }
};
