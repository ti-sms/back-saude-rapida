import { AddressProps } from "../../entities/address/address";

export type FindOutPutDto = {
  id: string;
  name: string;
  status: number;
  description: string;
  address: string | AddressProps;
};

export type ListOutPutDto = {
  id: string;
  name: string;
  status: number;
  description: string;
  address: string | AddressProps;
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
    address: AddressProps
  ): Promise<CreateOutputDto>;
  update(
    name: string,
    status: number,
    description: string
  ): Promise<void>;
}
