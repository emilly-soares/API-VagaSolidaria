const express = require("express");
const routes = express.Router();

const CandidateController = require("../controllers/CandidateController");
const UserController = require("../controllers/UserController");
const CompanyController = require("../controllers/CompanyController");
const VacancyController = require("../controllers/VacancyController");
const CandidateVacancyController = require("../controllers/CandidateVacancyController");
const { upload } = require('../middleware/upload');
const { protect } = require("../middleware/authenticate");
const { isAdmin, isBusiness, isCandidate } = require("../middleware/authorize");


routes.post("/userAuthentication", UserController.authenticate);
routes.post("/user", UserController.createUser);
routes.post('/resetPassword', UserController.resetPassword);
routes.post('/updatePassword', UserController.updatePassword);
routes.get('/userRole/:id', UserController.userRole);

routes.get("/companies", CompanyController.listCompanies);

routes.use(protect);
routes.post("/user", UserController.createUser);
routes.get("/users", UserController.listUsers);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);      
routes.get("/user/:id", UserController.findUser);

routes.post("/candidate", CandidateController.createCandidate);
routes.get("/candidates", isAdmin, CandidateController.listCandidates);
routes.put("/candidate/:userId", isCandidate, CandidateController.updateCandidate);
routes.delete("/candidate/:userId", isCandidate, CandidateController.deleteCandidate);
routes.get("/candidateFind/:userId", CandidateController.findCandidate);

routes.post('/company', upload.single('logo'), CompanyController.createCompany);
routes.put("/company/:companyId", upload.single('logo'), CompanyController.updateCompany);
routes.delete("/company/:companyId", CompanyController.deleteCompany);

routes.post("/vacancy", isBusiness, VacancyController.createVacancy);
routes.get("/vacancies", isBusiness, VacancyController.listVacancies);
routes.put("/vacancy/:vacancyId", isBusiness, VacancyController.updateVacancy);
routes.delete("/vacancy/:vacancyId", isBusiness, VacancyController.deleteVacancy);

routes.post("/candidateVacancy", isBusiness, CandidateVacancyController.createCandidateVacancy);
routes.get("/candidatesVacancies", isBusiness, CandidateVacancyController.listCandidateVacancies);
routes.put("/candidateVacancy/candidateVacancyId", isBusiness, CandidateVacancyController.updateCandidateVacancy);
routes.delete("/candidateVacancy/candidateVacancyId", isBusiness, CandidateVacancyController.deleteCandidateVacancy);


module.exports = routes;
