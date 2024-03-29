const express = require("express");
const routes = express.Router();
const CandidateController = require("../controllers/CandidateController");
const UserController = require("../controllers/UserController");
const CompanyController = require("../controllers/CompanyController");
const VacancyController = require("../controllers/VacancyController");
const CandidateVacancyController = require("../controllers/CandidateVacancyController");
const { protect } = require("../middleware/authenticate");

routes.post("/userAuthentication", UserController.authenticate);
routes.post("/user", UserController.createUser);
routes.post('/resetPassword', UserController.resetPassword);
routes.post('/updatePassword', UserController.updatePassword);
routes.get('/userAdmin/:id', UserController.isAdmin);

routes.use(protect);

routes.post("/userAdmin", UserController.createUser);
routes.get("/users", UserController.listUsers);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);
routes.get("/user/:id", UserController.findUser);

routes.post("/candidate", CandidateController.createCandidate);
routes.get("/candidates", CandidateController.listCandidates);
routes.put("/candidate/:userId", CandidateController.updateCandidate);
routes.delete("/candidate/:userId", CandidateController.deleteCandidate);
routes.get("/candidate/:search", CandidateController.findCandidate);

routes.post("/company", CompanyController.createCompany);
routes.get("/companies", CompanyController.listCompanies);
routes.put("/company/:companyId", CompanyController.updateCompany);
routes.delete("/company/:companyId", CompanyController.deleteCompany);

routes.post("/vacancy", VacancyController.createVacancy);
routes.get("/vacancies", VacancyController.listVacancies);
routes.put("/vacancy/:vacancyId", VacancyController.updateVacancy);
routes.delete("/vacancy/:vacancyId", VacancyController.deleteVacancy);

routes.post("/candidateVacancy", CandidateVacancyController.createCandidateVacancy);
routes.get("/candidatesVacancies", CandidateVacancyController.listCandidateVacancies);
routes.put("/candidateVacancy/candidateVacancyId", CandidateVacancyController.updateCandidateVacancy);
routes.delete("/candidateVacancy/candidateVacancyId", CandidateVacancyController.deleteCandidateVacancy);

module.exports = routes;
