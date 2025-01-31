import { AddressProps } from "../../entities/address/address";

export type FindOutPutDto = {
  id: string;
  name: string;
  description: string;
  hospitalAddressId: AddressProps;
};

export type CreateOutputDto = {
  id: string;
};

export interface HospitalService {
  find(id: string): Promise<FindOutPutDto>;
  create(
    name: string,
    description: string,
    hospitalAddressId: AddressProps
  ): Promise<CreateOutputDto>;
  update(
    id: string,
    name: string,
    description: string,
    hospitalAddressId: AddressProps
  ): Promise<void>;
}
