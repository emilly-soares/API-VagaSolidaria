require("./config/connection");
const routes = require("./routes/routes");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json(), cors(), routes);
app.listen(port, () => {
  console.log(`Run server...${port}`);
});
