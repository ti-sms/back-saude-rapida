import { body, param } from "express-validator";

export const personValidationCreateRules = () => {
  return [
    body("name").exists().withMessage("O nome é obrigatório"),
    body("name")
      .isLength({ min: 1, max: 100 })
      .isString()
      .withMessage("O nome está incorreto"),
    body("cpf").exists().withMessage("O cpf é obrigatório"),
    body("cpf")
      .isLength({ min: 1, max: 45 })
      .isString()
      .withMessage("O cpf está incorreto"),
    body("cns")
      .isLength({ max: 45 })
      .isString()
      .withMessage("O cns está incorreto"),
    body("phone")
      .isLength({ min: 1, max: 20 })
      .isString()
      .withMessage("O telefone está incorreto"),
    body("addressSchema.addressStreet")
      .isLength({ min: 1, max: 60 })
      .withMessage("Nome da rua deve ter entre 1 à 60 caracteres."),
    body("addressSchema.addressDistrict")
      .isLength({ min: 1, max: 45 })
      .withMessage("Nome do bairro deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressCity")
      .isLength({ min: 1, max: 45 })
      .withMessage("Nome da cidade deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressState")
      .isLength({ min: 1, max: 45 })
      .withMessage("Nome do estado deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressCep")
      .isLength({ min: 1, max: 45 })
      .withMessage("CEP deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressNumber")
      .isLength({ min: 1, max: 10 })
      .withMessage("Número do endereço deve ter entre 1 à 10 caracteres."),
  ];
};

export const personValidationUpdateRules = () => {
  return [
    param("id").exists().withMessage("O id é obrigatório"),
    param("id")
      .isLength({ min: 36, max: 36 })
      .isString()
      .withMessage("O id está incorreto"),
    body("name").exists().withMessage("O nome é obrigatório"),
    body("name")
      .isLength({ min: 1, max: 100 })
      .isString()
      .withMessage("O nome está incorreto"),
    body("cpf").exists().withMessage("O cpf é obrigatório"),
    body("cpf")
      .isLength({ min: 1, max: 45 })
      .isString()
      .withMessage("O cpf está incorreto"),
      body("cns")
      .isLength({ max: 45 })
      .isString()
      .withMessage("O cns está incorreto"),
    body("phone")
      .isLength({ min: 1, max: 20 })
      .isString()
      .withMessage("O telefone está incorreto"),
    body("addressSchema.addressStreet")
      .isLength({ min: 1, max: 60 })
      .withMessage("Nome da rua deve ter entre 1 à 60 caracteres."),
    body("addressSchema.addressDistrict")
      .isLength({ min: 1, max: 45 })
      .withMessage("Nome do bairro deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressCity")
      .isLength({ min: 1, max: 45 })
      .withMessage("Nome da cidade deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressState")
      .isLength({ min: 1, max: 45 })
      .withMessage("Nome do estado deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressCep")
      .isLength({ min: 1, max: 45 })
      .withMessage("CEP deve ter entre 1 à 45 caracteres."),
    body("addressSchema.addressNumber")
      .isLength({ min: 1, max: 10 })
      .withMessage("Número do endereço deve ter entre 1 à 10 caracteres."),
  ];
};
