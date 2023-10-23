const express = require("express");
const routes = express.Router();
const CandidateController = require("../controllers/CandidateController");
const UserController = require("../controllers/UserController");

routes.post("/candidate", CandidateController.createCandidate);
routes.get("/candidates", CandidateController.listCandidates);
routes.put("/candidate/:userId", CandidateController.updateCandidate);
routes.delete("/candidate/:userId", CandidateController.deleteCandidate);

routes.post("/user", UserController.createUser);
routes.get("/users", UserController.listUsers);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);

module.exports = routes;
