import axios from "axios";
axios.defaults.withCredentials = true;
// Get Access Token of user
export const getAccessToken = async (codeParams) => {
  try {
    return await axios.get(`/api/github/getAccessToken?code=${codeParams}`);
  } catch (error) {
    console.error(error);
  }
};

// Get data of user
export const getUserData = async (accessToken) => {
  try {
    return await axios.get(`/api/github/getUserData`);
  } catch (error) {
    console.error(error);
  }
};

// Create Repo on user Github
export const createRepo = async (name) => {
  try {
    return await axios.post(`/api/github/createRepo`, { name }, {});
  } catch (error) {
    console.error(error);
  }
};

// Update Repo and push code on user Github
export const updateRepo = async (updateInput) => {
  try {
    return await axios.put(`/api/github/updateRepo`, updateInput, {});
  } catch (error) {
    console.error(error);
  }
};
