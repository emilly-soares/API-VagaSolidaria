require("./configs/connection");
const routes = require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
const Candidate = require("./models/Candidate");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json(), cors(), routes);
app.listen(port, () => {
  console.log(`Run server...${port}`);
});


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
