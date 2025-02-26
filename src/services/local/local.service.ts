import { AddressProps } from "../../entities/address/address";
import { LocalProps } from "../../entities/local/local";

export type FindOutPutDto = {
  id: string;
  name: string;
  status: number;
  address: string | AddressProps;
};

export type ListOutPutDto = {
  id: string;
  name: string;
  status: number;
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
    address: AddressProps
  ): Promise<CreateOutputDto>;
  update(
    id: string,
    name: string,
    status: number,
    address: string
  ): Promise<void>;
}
