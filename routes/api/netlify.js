const express = require("express");
const router = express.Router();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// @route      GET api/netlify
// @desciption Saving access token
// @access     Private
router.get("/saveAccessToken", async (req, res) => {
  let token = req.get("Authorization");
  res.cookie("n_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 1800 * 1000),
    path: "/",
  });
  res.send("Token saved");
  try {
  } catch (error) {
    console.error(error);
    return;
  }
});

// @route      POST api/netlify
// @desciption Creating site and linking with GitHub Repo
// @access     Private
router.post("/createSite", async (req, res) => {
  let { username, repo_name, repo_ID, site_name } = req.body;

  let deployKeyData;
  let github_deploykeyid;
  const { cookies } = req;

  const g_token = cookies.g_token;
  const n_token = cookies.n_token;
  console.log("g_token");
  console.log(g_token);
  console.log("n_token");
  console.log(n_token);

  try {
    const response_deploy = await fetch(
      " https://api.netlify.com/api/v1/deploy_keys",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${n_token}`, //Bearer ACCESSTOKEN
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: site_name,
        }),
      }
    );

    deployKeyData = await response_deploy.json();
    console.log(deployKeyData);
  } catch (error) {
    console.error(error);
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo_name}/keys`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${g_token}`, //Bearer ACCESSTOKEN
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: site_name,
          key: deployKeyData.public_key,
        }),
      }
    );
    const data = await response.json();
    github_deploykeyid = data.id;
  } catch (error) {
    console.error(error);
    return;
  }

  try {
    const response = await fetch("https://api.netlify.com/api/v1/sites", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${n_token}`, //Bearer ACCESSTOKEN
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: site_name,
        repo: {
          provider: "github",
          repo: `${username}/${repo_name}`,
          branch: "main",
          private: false,
          cmd: "npm run build",
          dir: "dist",
          deploy_key_id: deployKeyData.id,
          repo_id: repo_ID,
        },
      }),
    });
    const data = await response.json();
    console.log("site api data");
    console.log(data);

    if (data.default_domain) {
      res.json(data.default_domain);
    }
    if (response.status === 422) {
      console.log("Site name is already taken!");
      try {
        const apiUrl = `https://api.github.com/repos/${username}/${repo_name}/keys/${github_deploykeyid}`;

        const response = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${g_token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("delete github key");
        console.log(response);
      } catch (error) {
        console.error(error);
      }

      res.json("Site name is already taken!");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
