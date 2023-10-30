const Vacancy = require("../models/Vacancy");

class VacancyController {
    static async createVacancy(req, res) {
        try {
            const {
                status,
                description,
                jobTitle,
                company_id,
                candidateId
            } = req.body;

            await Vacancy.create({
                status,
                description,
                jobTitle,
                company_id: parseInt(company_id),
                candidateId: parseInt(candidateId)
            });

            return res.status(201).json({ message: "Vaga criada com sucesso" });
        } catch (error) {
            console.error("Erro ao criar vaga:", error);
            res.status(500).json({ error: "Erro ao criar vaga" });
        }
    }

    static async listVacancies(req, res) {
        try {
            const vacancies = await Vacancy.findAll();
            return res.status(200).json(vacancies);
        } catch (error) {
            console.error("Erro ao listar vagas:", error);
            res.status(500).json({ error: "Erro ao listar vagas" });
        }
    }

    static async updateVacancy(req, res) {
        const vacancyId = req.params.vacancyId;
        const updatedVacancyData = req.body;

        try {
            const vacancy = await Vacancy.findByPk(vacancyId);

            if (!vacancy) {
                return res.status(404).json({ error: "Vaga não encontrada" });
            }

            await vacancy.update(updatedVacancyData);

            return res.status(200).json({ message: "Vaga atualizada com sucesso" });
        } catch (error) {
            console.error("Erro ao atualizar vaga:", error);
            res.status(500).json({ error: "Erro ao atualizar vaga" });
        }
    }

    static async deleteVacancy(req, res) {
        const vacancyId = req.params.vacancyId;
        try {
            const deletedRows = await Vacancy.destroy({
                where: {
                    id: vacancyId,
                },
            });

            if (deletedRows === 0) {
                return res.status(404).json({ error: "Vaga não encontrada" });
            }

            return res.status(200).json({ message: "Vaga excluída com sucesso" });
        } catch (error) {
            console.error("Erro ao excluir vaga:", error);
            res.status(500).json({ error: "Erro ao excluir vaga" });
        }
    }
}

module.exports = VacancyController;
