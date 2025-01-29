import { ApiExpress } from "./api/express/api.express";
import { AddressController } from "./api/express/controllers/address/address.controller";

 function main(){
    const api = ApiExpress.build();

    const controllerAddress = AddressController.build();

    // Endpoint de endereços
    api.addPostRoute("/address/create", controllerAddress.create);
    api.addGetRoute("/address/:id", controllerAddress.find);
    api.addUpdateRoute("/address/update/:id", controllerAddress.update);


    // Endpoint de hospitais
    api.addPostRoute("/hospital/create", controller.create);

    api.start(8000);
}

main();