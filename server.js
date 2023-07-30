const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => res.redirect("/login"));

// Define Routes
app.use("/api/github", require("./routes/api/github"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
