const express = require('express');
const routes = express.Router();
const UserController = require("../controllers/UserController");

routes.get("/users", UserController.listUsers);

routes.post("/user", UserController.createUser);

routes.delete("/user/:id", UserController.deleteUser);

routes.put("/user/:id", UserController.updateUser);

module.exports = routes;