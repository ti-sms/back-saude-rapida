import { ApiExpress } from "./api/express/api.express";
import { AddressController } from "./api/express/controllers/address/address.controller";

 function main(){
    const api = ApiExpress.build();

    const controller = AddressController.build();

    api.addPostRoute("/address/create", controller.create);

    api.start(8000);
}

main();