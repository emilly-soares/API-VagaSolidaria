const express = require('express');
const routes = express.Router();
const CandidateController = require("../controllers/CandidateController");
const UserController = require("../controllers/UserController");

routes.get("/users", UserController.listUsers);
routes.post("/user", UserController.createUser);
routes.delete("/user/:id", UserController.deleteUser);
routes.put("/user/:id", UserController.updateUser);


routes.get("/candidates", CandidateController.listCandidates);
routes.post("/candidate", CandidateController.createCandidate);

module.exports = routes;


