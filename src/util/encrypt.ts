import { Request, Response, NextFunction } from "express";
import CryptoJS from "crypto-js";
import { config } from "../config";

const secretKey = config.jwtSecret; // Substitua pela sua chave secreta

// Middleware para criptografar respostas
function encryptResponseMiddleware(res: any) {
  const teste = {
    name: "João da Silva",
    cpf: "082.654.854-82",
    cns: "",
    phone: "85989958252",
    addressSchema: {
        addressCep: "62700-00",
        addressState: "ce",
        addressCity: "canindé",
        addressStreet: "rua rua rua",
        addressDistrict: "Santa Luzia",
        addressNumber: "6240"
    }
  };
  const jsonString = JSON.stringify(teste);
  return CryptoJS.AES.encrypt(jsonString, secretKey).toString();
}

export default encryptResponseMiddleware;
  