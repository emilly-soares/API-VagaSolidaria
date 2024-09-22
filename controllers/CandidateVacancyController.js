const CandidateVacancy = require("../models/CandidateVacancy");
const Candidate = require("../models/Candidate");
const User = require("../models/User");

class CandidateVacancyController {

    static async createCandidateVacancy(req, res) {
        try {
            const {
                conclusion,
                evaluation,
                vacancyId,
                candidateId,
                availability
            } = req.body;

            const parsedVacancyId = parseInt(vacancyId);
            const parsedCandidateId = parseInt(candidateId);

            if (isNaN(parsedVacancyId) || isNaN(parsedCandidateId)) {
                return res.status(400).json({ error: "Dados inválidos fornecidos." });
            }

            const existingCandidateVacancy = await CandidateVacancy.findOne({
                where: {
                    vacancyId: parsedVacancyId,
                    candidateId: parsedCandidateId,
                },
                order: [['createdAt', 'DESC']]
            });

            if (existingCandidateVacancy) {
                const now = new Date();
                const lastApplicationDate = new Date(existingCandidateVacancy.createdAt);

                const diffInDays = (now - lastApplicationDate) / (1000 * 60 * 60 * 24);

                if (diffInDays < 30) {
                    return res.status(400).json({
                        message: "Você já se candidatou para esta vaga recentemente. Tente novamente após 30 dias."
                    });
                }
            }

            await CandidateVacancy.create({
                conclusion,
                evaluation,
                vacancyId: parsedVacancyId,
                candidateId: parsedCandidateId,
                availability
            });

            return res.status(201).json({ message: "Candidatura criada com sucesso" });

        } catch (error) {
            console.error("Erro ao criar Candidatura:", error);
            res.status(500).json({ error: "Erro ao criar Candidatura" });
        }
    }

    static async listCandidateVacancies(req, res) {
        try {
            const candidateVacancies = await CandidateVacancy.findAll();
            return res.status(200).json(candidateVacancies);
        } catch (error) {
            console.error("Erro ao listar Candidato-Vagas:", error);
            res.status(500).json({ error: "Erro ao listar Candidato-Vagas" });
        }
    }

    static async updateCandidateVacancy(req, res) {
        const candidateVacancyId = req.params.candidateVacancyId;
        const updatedCandidateVacancyData = req.body;

        try {
            const candidateVacancy = await CandidateVacancy.findByPk(candidateVacancyId);
            
            if (!candidateVacancy) {
                return res.status(404).json({ error: "Candidato-Vaga não encontrada" });
            }

            await candidateVacancy.update(updatedCandidateVacancyData);

            return res.status(200).json({ message: "Candidato-Vaga atualizada com sucesso" });
        } catch (error) {
            console.error("Erro ao atualizar Candidato-Vaga:", error);
            res.status(500).json({ error: "Erro ao atualizar Candidato-Vaga" });
        }
    }

    static async deleteCandidateVacancy(req, res) {
        const candidateVacancyId = req.params.candidateVacancyId;
        try {
            const deletedRows = await CandidateVacancy.destroy({
                where: {
                    id: candidateVacancyId,
                },
            });

            if (deletedRows === 0) {
                return res.status(404).json({ error: "Candidato-Vaga não encontrada" });
            }

            return res.status(200).json({ message: "Candidato-Vaga excluída com sucesso" });
        } catch (error) {
            console.error("Erro ao excluir Candidato-Vaga:", error);
            res.status(500).json({ error: "Erro ao excluir Candidato-Vaga" });
        }
    }

    static async findCandidatesVacancy(req, res) {
        try {
            const vacancyId = req.params.vacancyId;
            const candidates = await CandidateVacancy.findAll({
                where: { vacancyId },
            });
            res.json(candidates);
        } catch (error) {
            console.error('Erro ao obter candidatos:', error);
            res.status(500).json({ error: 'Erro ao obter candidatos' });
        }
    }

    static async generateCertificate(req, res) {
        const { candidateId, vacancyId } = req.params;
    
        try {
            const candidateVacancy = await CandidateVacancy.findOne({
                where: { candidateId, vacancyId }
            });
    
            if (!candidateVacancy) {
                return res.status(404).json({ error: "Candidato ou vaga não encontrados." });
            }

            if (!candidateVacancy.conclusion) {
                candidateVacancy.conclusion = new Date();
                await candidateVacancy.save();
            }
    
            return res.status(200).json({
                message: 'Certificado gerado com sucesso.',
                conclusionDate: candidateVacancy.conclusion
            });
    
        } catch (error) {
            console.error('Erro ao gerar certificado:', error);
            res.status(500).json({ error: 'Erro ao gerar certificado.' });
        }
    }
    

}

module.exports = CandidateVacancyController;
