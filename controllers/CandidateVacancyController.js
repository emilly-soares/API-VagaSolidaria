const CandidateVacancy = require("../models/CandidateVacancy");

class CandidateVacancyController {
    static async createCandidateVacancy(req, res) {
        try {
            const {
                conclusion,
                evaluation,
                grade,
                vacancyId,
                candidateId
            } = req.body;

            await CandidateVacancy.create({
                conclusion,
                evaluation,
                grade: parseInt(grade),
                vacancyId: parseInt(vacancyId),
                candidateId: parseInt(candidateId)
            });

            return res.status(201).json({ message: "Candidato-Vaga criada com sucesso" });
        } catch (error) {
            console.error("Erro ao criar Candidato-Vaga:", error);
            res.status(500).json({ error: "Erro ao criar Candidato-Vaga" });
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
}

module.exports = CandidateVacancyController;
