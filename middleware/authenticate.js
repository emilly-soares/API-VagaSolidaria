const jwt = require("jsonwebtoken");
const secret = require("dotenv").config();

class AuthenticateUser {
  static async protect(req, res, next) {
    const autorizationHeader = req.headers["authorization"];

    if (!autorizationHeader) {
      return res.status(500).json("Token Null");
    }

    const [bearer, token] = autorizationHeader.split(" ");

    try {
      if (bearer === "Bearer" && token) {
        const isToken = await jwt.verify(token, process.env.SECRET_KEY);

        if (isToken) {
          return next();
        }
      }
    } catch (error) {
      return res.status(500).json({ "Não autorizado! ": error });
    }
  }
}
module.exports = AuthenticateUser;
