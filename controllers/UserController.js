const User = require("../models/User");
const bcrypt = require("bcryptjs");

class UserController {
  static async createUser(req, res) {
    try {
      const { email, password, isAdmin } = req.body;
      const passwordCipher = await bcrypt.hash(password, 10);

      const user = await User.create({
        email: email,
        password: passwordCipher,
        isAdmin: isAdmin,
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  static async listUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });
      return res.status(200).json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  static async updateUser(req, res) {
    const id = req.params.id;
    const { email } = req.body;

    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      user.email = email;
      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  static async deleteUser(req, res) {
    const id = req.params.id;
    try {
      await User.destroy({
        where: {
          id: id,
        },
      });
      return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).json({ error: "Erro ao excluir usuário" });
    }
  }
}

module.exports = UserController;
