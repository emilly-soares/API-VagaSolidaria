require("./configs/connection");

const UserController = require("./controllers/UserController");
const express = require("express");
const cors = require("cors");
const Candidate = require("./models/Candidate");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json(), cors());
app.listen(port, () => {
  console.log(`Run server...${port}`);
});

app.get("/users", UserController.listUsers);

app.post("/user", UserController.createUser);

app.delete("/user/:id", UserController.deleteUser);

app.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.findAll();
    res.json(candidates);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.post("/candidate", async (req, res) => {
  try {
    const { name, dateBirth, CPF, street, numberStreet, neighborhood, userId } =
      req.body;
    await Candidate.create({
      name: name,
      dateBirth: dateBirth,
      CPF: CPF,
      street: street,
      numberStreet: numberStreet,
      neighborhood: neighborhood,
      userId: parseInt(userId),
    }).then(() => res.status(200).json("success"));
  } catch (err) {
    res.status(404).send(err);
  }
});
