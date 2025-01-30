import { Address, AddressProps } from "../../../entities/address/address";
import { Hospital } from "../../../entities/hospital/hospital";
import { AddressRepository } from "../../../repositories/address/address.repository";
import { HospitalRepository } from "../../../repositories/hospital/hospital.repository";
import {
  CreateOutputDto,
  FindOutPutDto,
  HospitalService,
} from "../hospital.service";

export class HospitalServiceImplementation implements HospitalService {
  private constructor(
    readonly repository: HospitalRepository,
    readonly repositoryAddress: AddressRepository
  ) {}

  public static build(
    repository: HospitalRepository,
    repositorryAddres: AddressRepository
  ) {
    return new HospitalServiceImplementation(repository, repositorryAddres);
  }

  public async create(
    hospitalName: string,
    hospitalDescription: string,
    address_addressId: AddressProps
  ): Promise<CreateOutputDto> {
    const aAddress = Address.create(
      address_addressId.addressState ?? "",
      address_addressId.addressDistrict ?? "",
      address_addressId.addressCity ?? "",
      address_addressId.addressState ?? "",
      address_addressId.addressCep ?? "",
      address_addressId.addressNumber ?? ""
    );

    const idAddress = await this.repositoryAddress.save(aAddress);

    const aHospital = Hospital.create(
      hospitalName,
      hospitalDescription,
      idAddress
    );

    await this.repository.save(aHospital);

    const output: CreateOutputDto = {
      id: aHospital.id,
    };

    return output;
  }

  public async find(hospitalId: string): Promise<FindOutPutDto> {
    const aHospital = await this.repository.find(hospitalId);

    if (!aHospital) {
      throw new Error("O hospital não foi encontrado");
    }

    const output: FindOutPutDto = {
      id: aHospital.id,
      name: aHospital.name,
      description: aHospital.description ?? "",
      hospitalAddressId: aHospital.address_addressId as AddressProps,
    };

    return output;
  }

  public async update(
    hospitalId: string,
    hospitalName: string,
    hospitalDescription: string,
    address_addressId: string
  ): Promise<void> {
    const aAddress = Hospital.with(
      hospitalId,
      hospitalName,
      hospitalDescription,
      address_addressId
    );

    await this.repository.update(aAddress);
  }
}
