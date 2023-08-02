const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");
const { response } = require("express");

const CLIENT_ID = "527ea110abf67e712d0b";
const CLIENT_SECRET = "000b291ec0c9deb78e6e1aa2bdbbfc1718409a34";

// @route      POST api/github
// @desciption Authenticating and Getting access token
// @access     Public
router.get("/getAccessToken", async (req, res) => {
  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
  await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data");

      console.log(data);

      res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
    })
    .catch((err) => {
      console.log("err");

      console.error(err);
    });
});

// @route      GET api/github
// @desciption Getting user data
// @access     Private
//access token is going to be passed in as an Authorization header
router.get("/getUserData", async (req, res) => {
  req.get("Authorization"); //Bearer ACCESSTOKEN

  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), //Bearer ACCESSTOKEN
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

// @route      POST api/github
// @desciption Creating repo in user github
// @access     Private

router.post("/createRepo", async (req, res) => {
  console.log("INSDEI CREATE REPO");
  const token = req.get("Authorization");

  const { username, repoName } = req.body;
  try {
    const response = await fetch(`https://api.github.com/user/repos`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: repoName,
        description: "Customized React app",
        private: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create the repository on GitHub.");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// @route      PUT api/github
// @desciption Pushing/updating user github repo
// @access     Private

router.put("/updateRepo", async (req, res) => {
  const token = req.get("Authorization");

  const { username, repoName, customizedCode } = req.body;
  try {
    for (const filePath in customizedCode) {
      const customizedData = customizedCode[filePath];
      console.log(customizedData[0].bcolor);
      const path_file = path.join(
        __dirname,
        "../../client/src/templates/Login.jsx"
      );
      let fileContent = fs.readFileSync(path_file).toString();
      fileContent = fileContent.replace(
        /bcolor/g,
        `"${customizedData[0].bcolor}"`
      );
      /*       console.log("filePath");
      console.log(filePath.split("/")[filePath.split("/").length - 1]); */
      console.log(fileContent);

      const encodedContent = Buffer.from(fileContent).toString("base64");
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Customized code",
            content: encodedContent,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update file ${filePath} in the repository.`);
      }
    }

    res.json(`https://github.com/${username}/${repoName}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
