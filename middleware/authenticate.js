const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

class AuthenticateUser {
  static async protect(req, res, next) {
    try {
      const authorizationHeader = req.headers["authorization"];
      if (!authorizationHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
      }

      const [bearer, token] = authorizationHeader.split(" ");

      if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ error: "Token inválido" });
      }

      const secretKey = process.env.SECRET_KEY;

      if (!secretKey) {
        return res.status(500).json({ error: "Chave secreta não definida" });
      }

      const decodedToken = jwt.verify(token, secretKey);
      req.user = decodedToken;

      next();
    } catch (error) {
      console.error("Erro de autenticação:", error);
      return res.status(401).json({ error: "Erro de autenticação" });
    }

  }
  static async isAdmin(req, res, next) {
    const user = req.user;
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Acesso não autorizado" + user.isAdmin });
    }
    next();
  }

}

module.exports = AuthenticateUser;
