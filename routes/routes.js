const express = require("express");
const routes = express.Router();
const CandidateController = require("../controllers/CandidateController");
const UserController = require("../controllers/UserController");
const CompanyController = require("../controllers/CompanyController");
const VacancyController = require("../controllers/VacancyController");
const isAuthenticated = require("../middleware/authenticate");

routes.post("/userAuthentication", UserController.authenticate);

routes.use(isAuthenticated.protect);

routes.post("/user", UserController.createUser);
routes.get("/users", UserController.listUsers);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);

routes.post("/candidate", CandidateController.createCandidate);
routes.get("/candidates", CandidateController.listCandidates);
routes.put("/candidate/:userId", CandidateController.updateCandidate);
routes.delete("/candidate/:userId", CandidateController.deleteCandidate);

routes.post("/company", CompanyController.createCompany);
routes.get("/companies", CompanyController.listCompanies);
routes.put("/company/:companyId", CompanyController.updateCompany);
routes.delete("/company/:companyId", CompanyController.deleteCompany);

routes.post("/vacancy", VacancyController.createVacancy);
routes.get("/vacancies", VacancyController.listVacancies);
routes.put("/vacancy/:vacancyId", VacancyController.updateVacancy);
routes.delete("/vacancy/:vacancyId", VacancyController.deleteVacancy);

module.exports = routes;
