require("./config/connection");
const routes = require("./routes/routes");
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`Run server...${port}`);
});

module.exports = app;
