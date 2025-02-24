import { ApiExpress } from "./api/express/api.express";
import { AddressController } from "./api/express/controllers/address/address.controller";
import { LoginController } from "./api/express/controllers/authentication/authetication.controller";
import { DepartmentController } from "./api/express/controllers/department/department.controller";
import { DocumentController } from "./api/express/controllers/document/document.controller";
import { PersonController } from "./api/express/controllers/person/person.controller";
import { SecretaryController } from "./api/express/controllers/secretary/secretary.controller";
import { UserController } from "./api/express/controllers/user/user.controller";
import { UserPermissionController } from "./api/express/controllers/user/userPermission.controller";
import decryptDataMiddleware from "./middlewares/decrypt";
import { validatePerson } from "./middlewares/person/person.midleware";
import { validateUser } from "./middlewares/user/user.midleware";
import { LoginValidationCreateRules } from "./validators/authentication/authetication.params.validator";
import {
  personValidationCreateRules,
  personValidationUpdateRules,
} from "./validators/person/person.params.validator";
import {
  userValidationCreateRules,
  userValidationUpdateRules,
} from "./validators/user/user.params.validator";

function main() {
  const api = ApiExpress.build();

  const controllerAddress = AddressController.build();
  const controllerSecretary = SecretaryController.build();
  const controllerDepartment = DepartmentController.build();
  const controllerUser = UserController.build();
  const controllerUserPermission = UserPermissionController.build();
  const controllerPerson = PersonController.build();
  const controllerLogin = LoginController.build();
  const controllerDocument = DocumentController.build();

  // Endpoint de endereço
  api.addPostRoute("/address/create", controllerAddress.create);
  api.addGetRoute("/address/:id", controllerAddress.find);
  api.addUpdateRoute("/address/update/:id", controllerAddress.update);

  // Endpoint de secretaria
  api.addGetRoute("/secretary/list", controllerSecretary.list);

  // Endpoint de departamento
  api.addGetRoute("/department/list", controllerDepartment.list);

  // Endpoint de usuários
  api.addPostRoute("/user/create", controllerUser.create, [
    decryptDataMiddleware,
    userValidationCreateRules(),
    validateUser,
  ]);
  api.addGetRoute("/user/list", controllerUser.list);
  api.addGetRoute("/user/:id", controllerUser.find);
  api.addUpdateRoute("/user/update/:id", controllerUser.update, [
    decryptDataMiddleware,
    userValidationUpdateRules(),
    validateUser,
  ]);

  // Endpoint de permissões de usuários
  api.addPostRoute("/userPermission/create", controllerUserPermission.create, [
    decryptDataMiddleware,
  ]);
  api.addGetRoute(
    "/userPermission/list/user/:id",
    controllerUserPermission.list
  );
  api.addUpdateRoute(
    "/userPermission/update/:id",
    controllerUserPermission.update,
    [decryptDataMiddleware]
  );

  // Endpoint de person
  api.addPostRoute("/person/create", controllerPerson.create, [
    decryptDataMiddleware,
    personValidationCreateRules(),
    validatePerson,
  ]);
  api.addGetRoute("/person/list", controllerPerson.list);
  api.addGetRoute("/person/:id", controllerPerson.find);
  api.addUpdateRoute("/person/update/:id", controllerPerson.update, [
    decryptDataMiddleware,
    personValidationUpdateRules(),
    validatePerson,
  ]);

  // Endpoint de autenticação
  api.addPostRoute("/login", controllerLogin.login, [
    decryptDataMiddleware,
    LoginValidationCreateRules(),
    validateUser,
  ]);

  api.start(8001);
}

main();
