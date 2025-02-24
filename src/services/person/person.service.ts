import { AddressProps } from "../../entities/address/address";

export type FindOutPutDto = {
  id: string;
  name: string;
  cpf: string;
  cns: string | null;
  phone: string | null;
  address_addressId: string | AddressProps;
};

export type ListOutPutDto = {
  id: string;
  name: string;
  cpf: string;
  cns: string | null;
  phone: string | null;
  address_addressId: string | AddressProps;
};

export type CreateOutputDto = {
  id: string;
};

export interface PersonService {
  find(id: string): Promise<FindOutPutDto>;
  list(): Promise<ListOutPutDto[]>;
  create(
    name: string,
    cpf: string,
    cns: string | null,
    phone: string | null,
    address_addressId: string | AddressProps
  ): Promise<CreateOutputDto>;
  update(
    id: string,
    name: string,
    cpf: string,
    cns: string | null,
    phone: string | null,
    address_addressId: string | AddressProps
  ): Promise<void>;
}
