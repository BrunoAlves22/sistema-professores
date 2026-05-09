const { verify } = require("jsonwebtoken");
const { AppError } = require("../errors/AppError");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token não fornecido", 401);
  }

  const [, token] = authHeader.split(" "); // "Bearer <token>"

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    return next();
  } catch {
    throw new AppError("Token inválido", 401);
  }
}

module.exports = { authMiddleware };
