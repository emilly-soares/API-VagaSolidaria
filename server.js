require("./configs/connection");
const User = require("./models/User");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json(), cors());
app.listen(port, () => {
  console.log(`Run server...${port}`);
});

app.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.create({
      email: email,
      password: password,
    }).then(() => res.status(200).json("success"));
  } catch (err) {
    res.status(404).send(err);
  }
});
