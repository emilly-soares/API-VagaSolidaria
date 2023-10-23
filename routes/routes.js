const express = require("express");
const routes = express.Router();
const CandidateController = require("../controllers/CandidateController");
const UserController = require("../controllers/UserController");

routes.get("/users", UserController.listUsers);
routes.post("/user", UserController.createUser);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);

routes.get("/candidates", CandidateController.listCandidates);
routes.post("/candidate", CandidateController.createCandidate);
routes.put("/candidate/:userId", CandidateController.updateCandidate);
routes.delete("/candidate/:userId", CandidateController.deleteCandidate);

module.exports = routes;
