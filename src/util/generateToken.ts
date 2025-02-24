import jwt from "jsonwebtoken";
import { config } from "../config";

interface UserPayload {
  id: string;
  position: string;
  email: string;
  password: string;
  signature: string;
  susKey: string;
  person: {
    id: string;
    name: string;
    cpf: string;
    phone: string;
    cns: string;
  };
  address: {
    id: string;
    street: string;
    district: string;
    number: string;
    city: string;
    state: string;
    cep: string;
  };
  department: {
    id: string;
    name: string;
  };
  secretary: {
    id: string;
    name: string;
    description: string | null;
  };
  permissions: [];
}

interface TokenData {
  token: string;
  expiresAt: Date;
}

export function generateToken(payload: UserPayload): TokenData {
  // Define a data de expiração (1 hora a partir de agora)
  const expiresIn = "8h";
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  // Gera o token com o payload criptografado
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn });

  return { token, expiresAt };
}
