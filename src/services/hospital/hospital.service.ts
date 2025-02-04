import { AddressProps } from "../../entities/address/address";

export type FindOutPutDto = {
  id: string;
  name: string;
  status: number;
  description: string;
  hospitalAddressId: AddressProps;
};

export type ListOutPutDto = {
  id: string;
  name: string;
  status: number;
  description: string | null;
  hospitalAddressId: string | AddressProps;
};

export type CreateOutputDto = {
  id: string;
};

export interface HospitalService {
  find(id: string): Promise<FindOutPutDto>;
  list(): Promise<ListOutPutDto[]>;
  create(
    name: string,
    status: number,
    description: string,
    hospitalAddressId: AddressProps
  ): Promise<CreateOutputDto>;
  update(
    id: string,
    name: string,
    status: number,
    description: string,
    hospitalAddressId: AddressProps
  ): Promise<void>;
}
