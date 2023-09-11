const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// @route      POST api/github
// @desciption Authenticating and Getting access token
// @access     Public
router.get("/getAccessToken", async (req, res) => {
  const params = `?client_id=${process.env.VITE_GITHUB_CLIENT_ID}&client_secret=${process.env.VITE_GITHUB_CLIENT_SECRET}&code=${req.query.code}&redirect_uri=http://127.0.0.1:5173/templates`;

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
      res.json(data.access_token);
      res.cookie("g_token", data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 1800 * 1000),
        path: "/",
      });

      res.json("Login Successfull");
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
  const { cookies } = req;

  const g_token = cookies.g_token;

  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${g_token}`, //Bearer ACCESSTOKEN
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
  const { cookies } = req;

  const g_token = cookies.g_token;

  const { name } = req.body;

  try {
    const response = await fetch(`https://api.github.com/user/repos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${g_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: "Customized React App",
        private: false,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create the repository on Github.");
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
  maxRetries = 10,
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
  const { cookies } = req;

  const g_token = cookies.g_token;

  const { username, repoName, userPages, customCode } = req.body;

  try {
    const folderPath = path.join(__dirname, "../../client/src/templates/root");
    const pushFolderContents = async (folderPath, targetPath = "") => {
      const files = fs.readdirSync(folderPath);

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const item = fs.statSync(filePath);

        if (item.isFile()) {
          let fileContent = fs.readFileSync(filePath, "utf-8");

          /* For customizing App.jsx of user pages */
          if (file === "App.jsx") {
            let login = false;
            let signup = false;

            for (const page of userPages) {
              console.log("USERPAGES");
              console.log(page);
              if (page.type === "Login") {
                login = page.type === "Login" && true;
              }
              if (page.type === "Signup") {
                signup = page.type === "Signup" && true;
              }

              console.log(login);
              console.log(signup);

              fileContent = fileContent.replace(
                new RegExp(`\\/\\*import${page.type}\\*\\/`, "g"),
                `import ${page.type} from "./userPages/${page.type}/${page.type}";`
              );
              if (page.type === "Footer" || page.type === "Header") {
                fileContent = fileContent.replace(
                  new RegExp(`{\\/\\*Route${page.type}\\*\\/}`, "g"),
                  `<${page.type}/> `
                );
              } else {
                fileContent = fileContent.replace(
                  new RegExp(`{\\/\\*Route${page.type}\\*\\/}`, "g"),
                  `<Route exact path="/${page.type.toLowerCase()}" element={<${
                    page.type
                  } />} /> ;`
                );
              }
            }
            console.log("login");
            console.log(login);
            console.log("signup");
            console.log(signup);

            if (login === true) {
              fileContent = fileContent.replace(
                new RegExp(`{\\/\\*RouteDefault\\*\\/}`, "g"),
                `<Route exact path="/"  element={<Navigate replace to="/login" />} />`
              );
            }
            if (signup === true && login === false) {
              fileContent = fileContent.replace(
                new RegExp(`{\\/\\*RouteDefault\\*\\/}`, "g"),
                `<Route exact path="/" element={<Navigate replace to="/signup" />} />`
              );
            }
            console.log(fileContent);
          }

          /* For customizing App.scss of user pages */
          if (file === "App.css") {
            fileContent = fileContent.replace(
              new RegExp(`(--primary-color:\\s*)(#[^;]+)`, "g"),
              `$1${customCode.primaryColor}`
            );
            console.log(fileContent);
          }
          const apiEndpoint = `https://api.github.com/repos/${username}/${repoName}/contents/${targetPath}${file}`;

          try {
            const response = await fetchWithRetry(apiEndpoint, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${g_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: `Add ${file}`,
                content: Buffer.from(fileContent).toString("base64"),
              }),
            });
            if (!response.ok) {
              throw new Error(
                `Failed to update file ${file} in the repository.`
              );
            }
          } catch (error) {
            console.error(error);
          }
        } else if (item.isDirectory()) {
          await pushFolderContents(filePath, `${targetPath}${file}/`);
        }
      }
    };

    await pushFolderContents(folderPath);
    for (const folder in userPages) {
      /*   const customizedData = customCode[filePath];
      console.log(customizedData[0].bcolor); */

      const path_file = path.join(
        __dirname,
        `../../client/src/templates/${userPages[folder].type}`
      );

      const files = fs.readdirSync(path_file);

      for (const file of files) {
        console.log("FILE");
        console.log(file);
        if (file.split(".")[0] !== userPages[folder].id) {
          continue;
        }

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
              Authorization: `Bearer ${g_token}`,
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
