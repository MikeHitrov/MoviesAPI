const express = require("express");
const morgan = require("morgan");
const port = 1337;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/index.routes"));

app.listen(port);
