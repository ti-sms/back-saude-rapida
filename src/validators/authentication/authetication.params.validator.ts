import { body, param } from "express-validator";

export const LoginValidationCreateRules = () => {
  return [
    body("email").isEmail().withMessage("Email é obrigatório"),
    body("password")
    .exists()
    .withMessage("A senha está incorreta"),
    body("password")
      .isLength({ min: 1, max: 20 })
      .isString()
      .withMessage("A senha está incorreta"),
  ];
};

 