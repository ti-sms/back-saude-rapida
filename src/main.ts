import { ApiExpress } from "./api/express/api.express";
import { AddressController } from "./api/express/controllers/address/address.controller";
import { HospitalControler } from "./api/express/controllers/hospital/hospital.controller";
import { validateCreateHospital } from "./middlewares/hospital/hospital.create.midleware";
import { hospitalValidationRules } from "./validators/hospital/hospital.params.validators";

 function main(){
    const api = ApiExpress.build();

    const controllerAddress = AddressController.build();
    const controllerHospital = HospitalControler.build();

    // Endpoint de endereços
    api.addPostRoute("/address/create", controllerAddress.create);
    api.addGetRoute("/address/:id", controllerAddress.find);
    api.addUpdateRoute("/address/update/:id", controllerAddress.update);

    api.addPostRoute("/hospital/create", controllerHospital.create, [hospitalValidationRules(), validateCreateHospital]);
   // api.addPostRoute("/hospital/create", controllerHospital.create, [authenticateToken, userIdValidationRules(), validate]);

    api.start(8000);
}

main();