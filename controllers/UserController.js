const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

class UserController {
  static async createUser(req, res) {
    try {
      const { email, password, isAdmin } = req.body;
      const passwordCipher = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: passwordCipher,
        isAdmin,
      });

      return res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).json({ error: "Erro ao criar usuário" });
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
      return res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  static async updateUser(req, res) {
    const id = req.params.id;
    const { email } = req.body;

    try {
      let user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      user.email = email;
      user = await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  static async deleteUser(req, res) {
    const id = req.params.id;
    try {
      const deletedUser = await User.destroy({
        where: {
          id,
        },
      });
      
      if (deletedUser === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      return res.status(500).json({ error: "Erro ao excluir usuário" });
    }
  }

  static async authenticate(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Senha incorreta" });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      return res.status(200).json({
        name: user.name,
        email: user.email,
        token,
      });
    } catch (error) {
      console.error("Erro na autenticação:", error);
      return res.status(500).json({ message: "Ocorreu um erro na autenticação" });
    }
  }
}

module.exports = UserController;
