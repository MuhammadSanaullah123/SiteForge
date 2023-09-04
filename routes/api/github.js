const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { serialize } = require("cookie");
const CLIENT_ID = "527ea110abf67e712d0b";
const CLIENT_SECRET = "000b291ec0c9deb78e6e1aa2bdbbfc1718409a34";

// @route      POST api/github
// @desciption Authenticating and Getting access token
// @access     Public
router.get("/getAccessToken", async (req, res) => {
  const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}&redirect_uri=http://127.0.0.1:5173/templates`;
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
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
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
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
    });
});

// @route      POST api/github
// @desciption Creating repo in user github
// @access     Private

router.post("/createRepo", async (req, res) => {
  const token = req.get("Authorization");

  const { name } = req.body;

  try {
    const response = await fetch(`https://api.github.com/user/repos`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: "Customized React App",
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

const fetchWithRetry = async (
  url,
  options,
  maxRetries = 3,
  retryDelay = 1000
) => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      throw new Error(`Failed with status: ${response.status}`);
    } catch (error) {
      console.error(
        `Request failed, retrying in ${retryDelay / 1000} seconds...`
      );
      retries++;
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
  throw new Error(`Max retries reached`);
};

router.put("/updateRepo", async (req, res) => {
  const token = req.get("Authorization");

  const { username, repoName, userPages, customizedCode } = req.body;

  try {
    const folderPath = path.join(__dirname, "../../client/src/templates/root");
    const pushFolderContents = async (folderPath, targetPath = "") => {
      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const item = fs.statSync(filePath);

        if (item.isFile()) {
          let fileContent = fs.readFileSync(filePath, "utf-8");
          if (file === "App.jsx") {
            for (const page of userPages) {
              fileContent = fileContent.replace(
                new RegExp(`\\/\\*import${page.type}\\*\\/`, "g"),
                `import ${page.type} from "./userPages/${page.type}";`
              );
              fileContent = fileContent.replace(
                new RegExp(`{\\/\\*RouteLogin\\*\\/}`, "g"),
                `<Route exact path="/${page.type.toLowerCase()}" element={<${
                  page.type
                } />} /> ;`
              );
              console.log(fileContent);
            }
          }
          const apiEndpoint = `https://api.github.com/repos/${username}/${repoName}/contents/${targetPath}${file}`;

          const response = await fetchWithRetry(apiEndpoint, {
            method: "PUT",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Add ${file}`,
              content: Buffer.from(fileContent).toString("base64"),
            }),
          });

          if (!response.ok) {
            throw new Error(`Failed to update file ${file} in the repository.`);
          }
        } else if (item.isDirectory()) {
          await pushFolderContents(filePath, `${targetPath}${file}/`);
        }
      }
    };

    await pushFolderContents(folderPath);
    for (const folder in userPages) {
      /*   const customizedData = customizedCode[filePath];
      console.log(customizedData[0].bcolor); */

      const path_file = path.join(
        __dirname,
        `../../client/src/templates/${userPages[folder].type}`
      );
      const files = fs.readdirSync(path_file);

      for (const file of files) {
        const filePath = path.join(path_file, file);

        let fileContent = fs.readFileSync(filePath).toString();

        if (file.split(".")[1] === "jsx") {
          fileContent = fileContent.replace(
            new RegExp('import "\\./' + file.split(".")[0] + '\\.scss"', "g"),
            `import "./${userPages[folder].type}.scss";`
          );
        }
        const encodedContent = Buffer.from(fileContent).toString("base64");

        console.log(fileContent);

        const response = await fetchWithRetry(
          `https://api.github.com/repos/${username}/${repoName}/contents/src/userPages/${
            userPages[folder].type
          }/${userPages[folder].type}.${file.split(".")[1]}`,
          {
            method: "PUT",
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: `Add ${userPages[folder].type}.${file.split(".")[1]}`,
              content: encodedContent,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to update file ${file} in the repository.`);
        }
      }

      /*     fileContent = fileContent.replace(
        /bcolor/g,
        `"${customizedData[0].bcolor}"`
      ); */
      /*       console.log("filePath");
      console.log(filePath.split("/")[filePath.split("/").length - 1]); */
    }

    res.json(`https://github.com/${username}/${repoName}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
