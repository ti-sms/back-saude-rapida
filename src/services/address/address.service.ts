export type FindOutPutDto = {
  id: string;
  street: string;
  district: string;
  number: string;
  city: string;
  state: string;
  cep: string;
};

export interface AddressService {
  find(id: string): Promise<FindOutPutDto>;
  create(
    id: string,
    street: string,
    district: string,
    number: string,
    city: string,
    state: string,
    cep: string
  ): Promise<void>;
  update(
    id: string,
    street: string,
    district: string,
    number: string,
    city: string,
    state: string,
    cep: string
  ): Promise<void>;
}
