const Vacancy = require("../models/Vacancy");

class VacancyController {

    static async createVacancy(req, res) {

        try {
            const {
                status,
                description,
                jobTitle,
                company_id,
                workload,
                responsibilities
            } = req.body;

            await Vacancy.create({
                status,
                description,
                jobTitle,
                company_id: parseInt(company_id),
                workload,
                responsibilities
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

    static async findByCompany(req, res) {
        const companyId = req.params.companyId;
        try {
            const vacancies = await Vacancy.findAll({ where: { company_id: companyId } });
            return res.status(200).json(vacancies);
        } catch (error) {
            console.error("Erro ao listar vagas por empresa:", error);
            res.status(500).json({ error: "Erro ao listar vagas por empresa" });
        }
    }

    static async findById(req, res) {
        const vacancyId = req.params.vacancyId;
        try {
            const vacancy = await Vacancy.findByPk(vacancyId);
            if (!vacancy) {
                return res.status(404).json({ error: "Vaga não encontrada" });
            }
            return res.status(200).json(vacancy);
        } catch (error) {
            console.error("Erro ao buscar vaga:", error);
            res.status(500).json({ error: "Erro ao buscar vaga" });
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
