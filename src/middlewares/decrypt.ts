import { Request, Response, NextFunction } from 'express';
import CryptoJS from 'crypto-js';
import { config } from '../config';

const secretKey = config.jwtSecret;

function decryptDataMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.body.data) {
    try {
      const bytes = CryptoJS.AES.decrypt(req.body.data, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      req.body = decryptedData; // Substitui o corpo da requisição pelos dados descriptografados
      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Erro ao descriptografar os dados' });
    }
  } else {
    return res.status(400).json({ message: 'Dados criptografados são necessários' });
  }
}

export default decryptDataMiddleware;
