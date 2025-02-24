import { body, param } from "express-validator";

export const secretaryValidationCreateRules = () => {
  return [
    body("name").exists().withMessage("O nome da secretária é obrigatório"),
    body("name")
      .isLength({ min: 1, max: 100 })
      .isString()
      .withMessage("O nome da secretária está incorreto"),
      body("description")
      .isLength({ max: 100 })
      .withMessage("A descrição da secretária está muito grande"),
  ];
};


export const secretaryValidationUpdateRules = () => {
  return [
    param("id").exists().withMessage("O id é obrigatório"),
    param("id")
      .isLength({ min: 36, max: 36 })
      .isString()
      .withMessage("O id está incorreto"),
    body("name").exists().withMessage("O nome da secretária é obrigatório"),
    body("name")
      .isLength({ min: 1, max: 100 })
      .isString()
      .withMessage("O nome da secretária está incorreto"),
      body("description")
      .isLength({ max: 100 })
      .withMessage("A descrição da secretária está muito grande"),
  ];
};

