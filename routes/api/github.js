const express = require("express");
const router = express.Router();

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
  console.log("HERE");

  console.log(req.query.code);

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

      res.json(data);
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
module.exports = router;
