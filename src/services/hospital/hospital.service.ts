export type FindOutPutDto = {
  id: string;
  name: string;
  description: string;
  hospitalAddressId: string;
};

export type CreateOutputDto = {
  id: string;
};

export interface HospitalService {
  find(id: string): Promise<FindOutPutDto>;
  create(
    id: string,
    name: string,
    description: string,
    hospitalAddressId: string
  ): Promise<CreateOutputDto>;
  update(
    id: string,
    name: string,
    description: string,
    hospitalAddressId: string
  ): Promise<void>;
}
