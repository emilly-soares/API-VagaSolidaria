const User = require("../models/User");

class UserController {
  static async createUser(req, res) {
    try {
      const { email, password, isAdmin } = req.body;
     const user = await User.create({
        email: email,
        password: password,
        isAdmin: isAdmin,
      })
      return res.status(200).json(user);
    } catch (err) {
      res.status(404).send(err);
    }
  }

  static async listUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(404).send(err);
    }
  }

  static async deleteUser(req, res) {
    const id = req.params.id;
    User.destroy({
      where: {
        id: id,
      },
    })
      .then(() => res.status(200).json("success"))
      .catch((err) => res.status(500).json("error", err.message));
  }
}
module.exports = UserController;
