import { Address } from "../../../entities/address/address";
import { AddressRepository } from "../../../repositories/address/address.repository";
import {
  AddressService,
  CreateOutputDto,
  FindOutPutDto,
  ListFindOutPutDto,
} from "../address.service";

export class AddressServiceImplementation implements AddressService {
  private constructor(readonly repository: AddressRepository) {}

  public static build(repository: AddressRepository) {
    return new AddressServiceImplementation(repository);
  }

  public async create(
    addressStreet: string,
    addressDistrict: string,
    addressCity: string,
    addressState: string,
    addressCep: string,
    addressNumber: string
  ): Promise<CreateOutputDto> {
    const aAddress = Address.create(
      addressStreet,
      addressDistrict,
      addressCity,
      addressState,
      addressCep,
      addressNumber
    );

    await this.repository.save(aAddress);

    const output: CreateOutputDto = {
      id: aAddress.id,
    };

    return output;
  }

  public async find(addressId: string): Promise<FindOutPutDto> {
    const aAddress = await this.repository.find(addressId);

    if (!aAddress) {
      throw new Error("O endereço não foi encontrado");
    }

    const output: FindOutPutDto = {
      id: aAddress.id,
      street: aAddress.street ?? "",
      district: aAddress.district ?? "",
      city: aAddress.city ?? "",
      state: aAddress.state ?? "",
      cep: aAddress.cep ?? "",
      number: aAddress.number ?? "",
    };

    return output;
  }

  public async searchMultipleId(
    listId: string[]
  ): Promise<ListFindOutPutDto[]> {
    const aAddress = await this.repository.findManyByIds(listId);

    if (!aAddress) {
      return [];
    }
    const address = aAddress.map((u) => {
      return {
        id: u.id,
        cep: u.cep ?? "",
        state: u.state ?? "",
        city: u.city ?? "",
        district: u.district ?? "",
        street: u.street ?? "",
        number: u.number ?? "",
      };
    });

    const output: ListFindOutPutDto[] = address;
    return output;
  }

  public async update(
    addressId: string,
    addressStreet: string,
    addressDistrict: string,
    addressCity: string,
    addressState: string,
    addressCep: string,
    addressNumber: string
  ): Promise<void> {
    const aAddress = Address.with(
      addressId,
      addressStreet,
      addressDistrict,
      addressCity,
      addressState,
      addressCep,
      addressNumber
    );

    await this.repository.update(aAddress);
  }
}
