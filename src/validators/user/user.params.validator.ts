import { body, param } from "express-validator";

export const userValidationCreateRules = () => {
  return [
    body("position").exists().withMessage("O cargo é obrigatório"),
    body("position")
      .isLength({ min: 1, max: 45 })
      .isString()
      .withMessage("O cargo está incorreto"),
    body("email").exists().withMessage("O e-mail é obrigatório"),
    body("email")
      .isLength({ min: 1, max: 100 })
      .isEmail()
      .withMessage("O e-mail está incorreto"),
    body("password").exists().withMessage("A senha é obrigatório"),
    body("password")
      .isLength({ min: 1, max: 20 })
      .isString()
      .withMessage("A senha está incorreto"),
    body("person.personName").exists().withMessage("O nome é obrigatório"),
    body("person.personName")
      .isLength({ min: 1, max: 100 })
      .isString()
      .withMessage("O nome está incorreto"),
    body("person.personCpf").exists().withMessage("O CPF é obrigatório"),
    body("person.personCpf")
      .isLength({ min: 1, max: 11 })
      .isString()
      .withMessage("O cpf está incorreto"),
    body("person.personPhone").exists().withMessage("O telefone é obrigatório"),
    body("person.personPhone")
      .isLength({ min: 1, max: 13 })
      .isString()
      .withMessage("O telefone está incorreto"),
      body("person.address_addressId.addressStreet")
      .isLength({ min: 1, max: 60 })
      .withMessage("Nome da rua deve ter entre 1 à 60 caracteres."),
    body("person.address_addressId.addressDistrict")
      .isLength({ min: 1, max: 45 })
      .withMessage("Nome do bairro deve ter entre 1 à 45 caracteres."),
    body("person.address_addressId.addressCity")
      .isLength({ min: 1, max: 45 })
      .withMessage("Nome da cidade deve ter entre 1 à 45 caracteres."),
    body("person.address_addressId.addressState")
      .isLength({ min: 1, max: 45 })
      .withMessage("Nome do estado deve ter entre 1 à 45 caracteres."),
    body("person.address_addressId.addressCep")
      .isLength({ min: 1, max: 45 })
      .withMessage("CEP deve ter entre 1 à 45 caracteres."),
    body("person.address_addressId.addressNumber")
      .isLength({ min: 1, max: 10 })
      .withMessage("Número do endereço deve ter entre 1 à 10 caracteres."),
      body("permission.status")
      .isNumeric()
      .withMessage("Tipo precisa ser numérico"),
      body("permission.type")
      .isString()
      .isLength({ min: 1, max: 45 })
      .withMessage("Tipo de permissão está incorreto"),
      body("permission.systemId")
      .isString()
      .isLength({ min: 36, max: 36 })
      .withMessage("Tipo de sistema está incorreto"),
  ];
};

export const userValidationUpdateRules = () => {
  return [
    param("id").exists().withMessage("O id é obrigatório"),
    param("id")
      .isLength({ min: 36, max: 36 })
      .isString()
      .withMessage("O id está incorreto"),
    body("email").exists().withMessage("O e-mail é obrigatório"),
    body("email")
      .isLength({ min: 1, max: 100 })
      .isEmail()
      .withMessage("O e-mail está incorreto"),
    body("position").exists().withMessage("O cargo é obrigatório"),
    body("position")
      .isLength({ min: 1, max: 45 })
      .isString()
      .withMessage("O cargo está incorreto"),
    body("password").exists().withMessage("A senha é obrigatório"),
    body("password")
      .isLength({ min: 1, max: 20 })
      .isString()
      .withMessage("A senha está incorreto"),
  ];
};
