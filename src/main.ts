import { ApiExpress } from "./api/express/api.express";
import { AddressController } from "./api/express/controllers/address/address.controller";
import { HospitalControler } from "./api/express/controllers/hospital/hospital.controller";
import { validateHospital } from "./middlewares/hospital/hospital.create.midleware";
import { hospitalValidationCreateRules, hospitalValidationFindRules, hospitalValidationPatchRules, hospitalValidationUpdateRules } from "./validators/hospital/hospital.params.validators";

 function main(){
    const api = ApiExpress.build();

    const controllerAddress = AddressController.build();
    const controllerHospital = HospitalControler.build();

    // Endpoint de endereço
    api.addPostRoute("/address/create", controllerAddress.create);
    api.addGetRoute("/address/:id", controllerAddress.find);
    api.addUpdateRoute("/address/update/:id", controllerAddress.update);

    // Endpoint de hospital
    api.addPostRoute("/hospital/create", controllerHospital.create, [hospitalValidationCreateRules(), validateHospital]);
    api.addGetRoute("/hospital/list", controllerHospital.list);
    api.addGetRoute("/hospital/:id", controllerHospital.find, [hospitalValidationFindRules(), validateHospital]);
    api.addUpdateRoute("/hospital/update/:id", controllerHospital.update, [hospitalValidationUpdateRules(), validateHospital]);
    api.addPatchRoute("/hospital/update/status/:id", controllerHospital.patch, [hospitalValidationPatchRules(), validateHospital]);
   // api.addPostRoute("/hospital/create", controllerHospital.create, [authenticateToken, userIdValidationRules(), validate]);

    api.start(8000);
}

main();