import { Address } from "../../../entities/address/address";
import { AddressRepository } from "../../../repositories/address/address.repository";
import {
  AddressService,
  CreateOutputDto,
  FindOutPutDto,
} from "../address.service";

export class AddressServiceImplementation implements AddressService {
  private constructor(readonly repository: AddressRepository) {}

  public static build(repository: AddressRepository) {
    return new AddressServiceImplementation(repository);
  }

  public async create(
    addressStreet: string,
    addressDistrict: string,
    addressNumber: string,
    addressCity: string,
    addressState: string,
    addressCep: string
  ): Promise<CreateOutputDto> {
    const aAddress = Address.create(
      addressStreet,
      addressNumber,
      addressCity,
      addressDistrict,
      addressState,
      addressCep
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
      number: aAddress.number ?? "",
      city: aAddress.city ?? "",
      state: aAddress.state ?? "",
      cep: aAddress.cep ?? "",
    };

    return output;
  }

  public async update(
    addressId: string,
    addressStreet: string,
    addressDistrict: string,
    addressNumber: string,
    addressCity: string,
    addressState: string,
    addressCep: string
  ): Promise<void> {
    const aAddress = Address.with(
      addressId,
      addressStreet,
      addressNumber,
      addressCity,
      addressDistrict,
      addressState,
      addressCep
    );

    await this.repository.update(aAddress);
  }
}
