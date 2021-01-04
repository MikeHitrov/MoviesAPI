const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const port = 1337;

const app = express();

app.use(cors());
app.use(morgan("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes"));

app.listen(port);
