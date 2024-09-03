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

routes.post("/candidate", CandidateController.createCandidate);
routes.get("/user-candidateFind/:userId", CandidateController.findCandidate);
routes.get('/companies', CompanyController.listCompanies);
routes.get('/find/company/:companyId', CompanyController.findById);
routes.get("/vacancies", VacancyController.listVacancies);
routes.get('/vacancy/:vacancyId', VacancyController.findById);
routes.get('/vacancies/company/:companyId', VacancyController.findByCompany);
routes.post("/apply", CandidateVacancyController.createCandidateVacancy);

routes.use(protect);

routes.get("/user/:id", UserController.findUser);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);
routes.get("/users", isAdmin, UserController.listUsers);

routes.get("/candidate/userDetails/:candidateId", CandidateController.findUserCandidate);
routes.put("/candidate/:userId", isCandidate, CandidateController.updateCandidate);
routes.delete("/candidate/:userId", isCandidate, CandidateController.deleteCandidate);

routes.post('/company', upload.single('logo'), isAdmin, CompanyController.createCompany);
routes.put("/company/:companyId", upload.single('logo'), isAdmin, CompanyController.updateCompany);
routes.delete("/company/:companyId", isAdmin, CompanyController.deleteCompany);
routes.get('/company/:userId', isAdmin, CompanyController.findCompanyByUserId);

routes.post("/vacancy", isBusiness, VacancyController.createVacancy);
routes.put("/vacancy/:vacancyId", isBusiness, VacancyController.updateVacancy);
routes.delete("/vacancy/:vacancyId", isBusiness, VacancyController.deleteVacancy);

routes.get("/candidatesVacancies", isBusiness, CandidateVacancyController.listCandidateVacancies);
routes.put("/candidateVacancy/:candidateVacancyId", isBusiness, CandidateVacancyController.updateCandidateVacancy);
routes.delete("/candidateVacancy/:candidateVacancyId", isBusiness, CandidateVacancyController.deleteCandidateVacancy);
routes.get('/candidates/vacancy/:vacancyId', isBusiness, CandidateVacancyController.findCandidatesVacancy);
routes.get("/candidates", CandidateController.listCandidates);

module.exports = routes;
