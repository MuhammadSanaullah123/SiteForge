import axios from "axios";
axios.defaults.withCredentials = true;

//Store access token of user
export const saveAccessToken = async (codeParams) => {
  try {
    return await axios.get(
      `http://127.0.0.1:5000/api/netlify/saveAccessToken`,
      {
        headers: {
          Authorization: codeParams,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//Create a site and link with GitHub Repo
export const createSite = async (username, repo_name, repo_ID, site_name) => {
  try {
    return await axios.post(
      `http://127.0.0.1:5000/api/netlify/createSite`,
      { site_name, username, repo_name, repo_ID },
      {}
    );
  } catch (error) {
    console.error(error);
  }
};
