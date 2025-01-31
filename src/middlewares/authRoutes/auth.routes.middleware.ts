// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = "sua_chave_secreta"; // Substitua pela sua chave secreta

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
   // req.params = decoded; // Armazene as informações do usuário no objeto de requisição (Descomitar esse código)
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};
