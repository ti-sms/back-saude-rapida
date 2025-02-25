import { Request, Response, NextFunction } from "express";
import CryptoJS from "crypto-js";
import { config } from "../config";

const secretKey = config.jwtSecret; // Substitua pela sua chave secreta

// Middleware para criptografar respostas
function encryptResponseMiddleware(res: any) {

  const jsonString = JSON.stringify(res);

  return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
}

export default encryptResponseMiddleware;
  