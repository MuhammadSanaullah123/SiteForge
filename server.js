const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

// Define Routes
app.use("/api/github", require("./routes/api/github"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
