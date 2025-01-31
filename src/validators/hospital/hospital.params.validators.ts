// src/validators/userValidator.ts
import { body } from "express-validator";

export const hospitalValidationRules = () => {
  return [
    body("name").isString().withMessage("Nome do hospital inválido"),
    body("name").isLength({ min: 1, max: 45 }).withMessage("Nome do hospital deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressStreet").isLength({ min: 1, max: 60}).withMessage("Nome da rua deve ter entre 1 à 60 caracteres."),
    body("addressSchema.addressDistrict").isLength({ min: 1, max: 45}).withMessage("Nome do bairro deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressCity").isLength({ min: 1, max: 45}).withMessage("Nome da cidade deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressState").isLength({ min: 1, max: 45}).withMessage("Nome do estado deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressCep").isLength({ min: 1, max: 45}).withMessage("CEP deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressNumber").isLength({ min: 1, max: 10}).withMessage("Número do endereço deve ter entre 1 à 10 caracteres."),
    //param("id").isInt().withMessage("O ID do usuário deve ser um número inteiro"
  ];
};
