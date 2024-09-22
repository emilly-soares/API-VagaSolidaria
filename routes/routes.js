const express = require("express");
const routes = express.Router();

const CandidateController = require("../controllers/CandidateController");
const UserController = require("../controllers/UserController");
const CompanyController = require("../controllers/CompanyController");
const VacancyController = require("../controllers/VacancyController");
const CandidateVacancyController = require("../controllers/CandidateVacancyController");

const { upload } = require('../middleware/upload');
const { protect } = require("../middleware/authenticate"); 

routes.post("/userAuthentication", UserController.authenticate);
routes.post("/user", UserController.createUser);
routes.post('/resetPassword', UserController.resetPassword);
routes.post('/updatePassword', UserController.updatePassword);
routes.get('/userRole/:id', UserController.userRole); 

routes.post("/candidate", CandidateController.createCandidate);
routes.get("/user-candidateFind/:userId", CandidateController.findCandidate);
routes.get('/companies', CompanyController.listCompanies);
routes.get('/find/company/:companyId', CompanyController.findById);
routes.get("/vacancies", VacancyController.listVacancies);
routes.get('/vacancy/:vacancyId', VacancyController.findById);
routes.get('/vacancies/company/:companyId', VacancyController.findByCompany);
routes.post("/apply", CandidateVacancyController.createCandidateVacancy);
routes.post('/generateCertificate/:candidateId/:vacancyId', CandidateVacancyController.generateCertificate);

routes.use(protect);

routes.get("/user/:id", UserController.findUser);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);
routes.get("/users", UserController.listUsers);

routes.get("/candidate/userDetails/:candidateId", CandidateController.findUserCandidate);
routes.put("/candidate/:userId", CandidateController.updateCandidate);
routes.delete("/candidate/:userId", CandidateController.deleteCandidate);

routes.post('/company', upload.single('logo'), CompanyController.createCompany);
routes.put("/company/:companyId", upload.single('logo'), CompanyController.updateCompany);
routes.delete("/company/:companyId", CompanyController.deleteCompany);
routes.get('/company/:userId', CompanyController.findCompanyByUserId);

routes.post("/vacancy", VacancyController.createVacancy);
routes.put("/candidateVacancy/:candidateVacancyId", CandidateVacancyController.updateCandidateVacancy);

routes.delete("/vacancy/:vacancyId", VacancyController.deleteVacancy);

routes.get("/candidatesVacancies", CandidateVacancyController.listCandidateVacancies);
routes.put("/candidateVacancy/:candidateVacancyId", CandidateVacancyController.updateCandidateVacancy);
routes.delete("/candidateVacancy/:candidateVacancyId", CandidateVacancyController.deleteCandidateVacancy);
routes.get('/candidates/vacancy/:vacancyId', CandidateVacancyController.findCandidatesVacancy);
routes.get("/candidates", CandidateController.listCandidates);

module.exports = routes;
