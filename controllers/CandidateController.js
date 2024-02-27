const { Op } = require("sequelize");
const Candidate = require("../models/Candidate");

class CandidateController {
  static async createCandidate(req, res) {
    try {
      const {
        name,
        dateBirth,
        CPF,
        phone,
        street,
        numberStreet,
        neighborhood,
        userId,
      } = req.body;

      const candidate = await Candidate.create({
        name,
        dateBirth,
        CPF,
        street,
        phone,
        numberStreet,
        neighborhood,
        userId: parseInt(userId),
      });

      return res.status(201).json({ message: "Candidato criado com sucesso", candidate });
    } catch (error) {
      console.error("Erro ao criar candidato:", error);
      return res.status(500).json({ error: "Erro ao criar candidato" });
    }
  }

  static async listCandidates(req, res) {
    try {
      const candidates = await Candidate.findAll();
      return res.status(200).json(candidates);
    } catch (error) {
      console.error("Erro ao listar candidatos:", error);
      return res.status(500).json({ error: "Erro ao listar candidatos" });
    }
  }

  static async updateCandidate(req, res) {
    const userId = req.params.userId;
    const updatedCandidateData = req.body;

    try {
      const candidate = await Candidate.findOne({ where: { userId } });

      if (!candidate) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      await candidate.update(updatedCandidateData);

      return res.status(200).json({ message: "Candidato atualizado com sucesso", candidate });
    } catch (error) {
      console.error("Erro ao atualizar candidato:", error);
      return res.status(500).json({ error: "Erro ao atualizar candidato" });
    }
  }

  static async deleteCandidate(req, res) {
    const userId = req.params.userId;
    try {
      const deletedRows = await Candidate.destroy({
        where: {
          userId,
        },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      return res.status(200).json({ message: "Candidato excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir candidato:", error);
      return res.status(500).json({ error: "Erro ao excluir candidato" });
    }
  }

  static async findCandidate(req, res) {
    const searchTerm = req.query.searchTerm;

    try {
      let candidatesByName = [];
      let candidatesByCPF = [];

      if (searchTerm) {
        candidatesByName = await Candidate.findAll({
          where: {
            name: { [Op.iLike]: `%${searchTerm}%` }, 
          },
        });

        candidatesByCPF = await Candidate.findAll({
          where: {
            CPF: searchTerm, 
          },
        });
      }

      const result = {
        candidatesByName,
        candidatesByCPF,
      };

      return res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao buscar candidato:", error);
      return res.status(500).json({ error: "Erro ao buscar candidato" });
    }
  }


}

module.exports = CandidateController;
