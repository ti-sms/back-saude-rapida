import { Address } from "../entities/address/address";
import { convertAddressToObject } from "./convertAddressToObject";

export function updateAddressesOnEntityList(rawAddressList: Address[], entityList: any[]): any[] {
  const addressList = convertAddressToObject(rawAddressList);
    return addressList.map((id) => {
      const entity = entityList.find(entity => entity.address === id.addressId);

      return { 
        id: entity?.id, 
        name: entity?.name,
        description: entity?.description,
        status: entity?.status,
        address: id };
    });
  }

