import { Address } from "../../../entities/address/address";
import { ListOutPutDto } from "../hospital.service";
import { convertAddressToObject } from "./convertAddressToObject";

export function updateHospitalAddresses(ids: Address[], hospitals: ListOutPutDto[]): any[] {
  const addressList = convertAddressToObject(ids);
    return addressList.map((id) => {
      const hospital = hospitals.find(hospital => hospital.address === id.addressId);

      return { 
        id: hospital?.id, 
        name: hospital?.name,
        description: hospital?.description,
        status: hospital?.status,
        address: id };
    });
  }

