const Candidate = require("../models/Candidate");

class CandidateController {
  static async createCandidate(req, res) {
    try {
      const {
        name,
        dateBirth,
        CPF,
        street,
        numberStreet,
        neighborhood,
        userId,
      } = req.body;

      await Candidate.create({
        name: name,
        dateBirth: dateBirth,
        CPF: CPF,
        street: street,
        numberStreet: numberStreet,
        neighborhood: neighborhood,
        userId: parseInt(userId),
      });

      return res.status(201).json({ message: "Candidato criado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar candidato:", error);
      res.status(500).json({ error: "Erro ao criar candidato" });
    }
  }

  static async listCandidates(req, res) {
    try {
      const candidates = await Candidate.findAll();
      return res.status(200).json(candidates);
    } catch (error) {
      console.error("Erro ao listar candidatos:", error);
      res.status(500).json({ error: "Erro ao listar candidatos" });
    }
  }

  static async deleteCandidate(req, res) {
    const userId = req.params.userId;
    try {
      await Candidate.destroy({
        where: {
          userId: userId,
        },
      });
      return res
        .status(200)
        .json({ message: "Candidato excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir candidato:", error);
      res.status(500).json({ error: "Erro ao excluir candidato" });
    }
  }

  static async updateCandidate(req, res) {
    const userId = req.params.userId;
    const updatedCandidateData = req.body;

    try {
      const candidate = await Candidate.findByPk(userId);

      if (!candidate) {
        return res.status(404).json({ error: "Candidato não encontrado" });
      }

      await candidate.update({
        name: updatedCandidateData.name,
        dateBirth: updatedCandidateData.dateBirth,
        CPF: updatedCandidateData.CPF,
        street: updatedCandidateData.street,
        numberStreet: updatedCandidateData.numberStreet,
        neighborhood: updatedCandidateData.neighborhood,
      });

      return res
        .status(200)
        .json({ message: "Candidato atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar candidato:", error);
      res.status(500).json({ error: "Erro ao atualizar candidato" });
    }
  }
}

module.exports = CandidateController;
