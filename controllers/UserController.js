const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');

const gmailUser = process.env.GMAIL_USER;
const gmailPass = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailPass,
  },
});

class UserController {

  static async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const passwordCipher = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: passwordCipher,
        role, 
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
    const { name, email, password } = req.body;

    try {
      let user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      user.email = email;
      user.name = name;
      user.password = password;
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
        user: user.id,
        name: user.name,
        email: user.email,
        token,
      });
    } catch (error) {
      console.error("Erro na autenticação:", error);
      return res.status(500).json({ message: "Ocorreu um erro na autenticação" });
    }
  }


  static async findUser(req, res) {
    const userId = req.params.id;

    try {
      if (!userId) {
        return res.status(400).json({ error: "É necessário fornecer um userId válido" });
      }

      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }


  static async resetPassword(req, res) {
    const { email } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'E-mail não encontrado' });
      }

      const resetToken = Math.random().toString(36).substring(2, 8);

      user.resetToken = resetToken;

      await user.save();

      const mailOptions = {
        from: 'vagasolidaria.na@gmail.com',
        to: email,
        subject: 'Recuperação de senha',
        text: `Você solicitou uma recuperação de senha. Use o token ${resetToken} para redefinir sua senha.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erro ao enviar e-mail:', error);
          return res.status(500).json({ error: 'Erro ao enviar e-mail de recuperação de senha' });
        }
        console.log('E-mail de recuperação de senha enviado:', info.response);

        return res.status(200).json({ message: 'E-mail de recuperação de senha enviado com sucesso', resetToken });
      });
    } catch (error) {
      console.error('Erro ao processar recuperação de senha:', error);
      return res.status(500).json({ error: 'Erro ao processar recuperação de senha' });
    }
  }


  static async userRole(req, res) {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      return res.json({ role: user.role });
  
    } catch (error) {
      console.error('Erro ao verificar o papel do usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }


  static async updatePassword(req, res) {
    const { email, token, newPassword } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'E-mail não encontrado' });
      }


      if (user.resetToken !== token) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await user.update({ password: hashedPassword });

      const mailOptions = {
        from: 'vagasolidaria.na@gmail.com',
        to: email,
        subject: 'Senha alterada com sucesso',
        text: 'Sua senha foi alterada com sucesso.',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erro ao enviar e-mail:', error);
          return res.status(500).json({ error: 'Erro ao enviar e-mail de confirmação de senha' });
        }
        console.log('E-mail de confirmação de senha enviado:', info.response);
        return res.status(200).json({ message: 'Senha alterada com sucesso' });
      });
    } catch (error) {
      console.error('Erro ao processar recuperação de senha:', error);
      return res.status(500).json({ error: 'Erro ao processar recuperação de senha' });
    }
  }

}

module.exports = UserController;
