const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class AuthenticateUser {

  static async protect(req, res, next) {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      return res.status(401).json({ error: "Token não fornecido" });
    }


    const [bearer, token] = authorizationHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ error: "Token inválido" });
    }


    const secretResult = dotenv.config();


    if (secretResult.error) {
      console.error("Erro ao carregar a chave secreta:", secretResult.error);
      return res.status(500).json({ error: "Erro interno" });
    }

    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      return res.status(500).json({ error: "Chave secreta não definida" });
    }


    try {
      const isToken = await jwt.verify(token, secretKey);

      if (isToken) {
        return next();
      } else {
        return res.status(401).json({ error: "Token inválido" });
      }
    } catch (error) {
      console.error("Erro de autenticação:", error);
      return res.status(401).json({ error: "Erro de autenticação" });
    }

  }
}

module.exports = AuthenticateUser;
