const Candidate = require("../models/Candidate");

class CandidateController {
  static async listCandidates(req, res) {
    try {
      const candidates = await Candidate.findAll();
      res.json(candidates);
    } catch (err) {
      res.status(404).send(err);
    }
  }

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
      }).then(() => res.status(200).json("success"));
    } catch (err) {
      res.status(404).send(err);
    }
  }
}

module.exports = CandidateController;
