const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));
app.use(express.json());
app.use(cookieParser());
// Define Routes
app.use("/api/github", require("./routes/api/github"));
app.use("/api/netlify", require("./routes/api/netlify"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
