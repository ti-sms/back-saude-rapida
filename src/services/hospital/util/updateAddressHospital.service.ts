import { Address } from "../../../entities/address/address";
import { ListOutPutDto } from "../hospital.service";

export function updateAddresses(ids: Address[], hospitals: ListOutPutDto[]): any[] {
    return ids.map((id) => {
      const hospital = hospitals.find(hospital => hospital.id === id.id);
      return { 
        id: id.id, 
        name: hospital?.name,
        description: hospital?.description,
        status: hospital?.status,
        address: id };
    });
  }

