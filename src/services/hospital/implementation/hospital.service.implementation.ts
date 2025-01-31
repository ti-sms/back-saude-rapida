import { Address, AddressProps } from "../../../entities/address/address";
import { Hospital } from "../../../entities/hospital/hospital";
import { AddressRepository } from "../../../repositories/address/address.repository";
import { HospitalRepository } from "../../../repositories/hospital/hospital.repository";
import {
  CreateOutputDto,
  FindOutPutDto,
  HospitalService,
  ListOutPutDto,
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
    hospitalAddressId: AddressProps
  ): Promise<CreateOutputDto> {
    const aAddress = Address.create(
      hospitalAddressId.addressStreet ?? "",
      hospitalAddressId.addressDistrict ?? "",
      hospitalAddressId.addressCity ?? "",
      hospitalAddressId.addressState ?? "",
      hospitalAddressId.addressCep ?? "",
      hospitalAddressId.addressNumber ?? ""
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

  public async list(): Promise<ListOutPutDto[]> {
    const aHospital = await this.repository.list();

    const hospital = aHospital.map((h) => {
        return {
            id: h.id,
            name: h.name,
            description: h.description,
            address_addressId: h.address_addressId,
        };
    });

    const output: ListOutPutDto[] = 
      hospital
    ;

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
    hospitalAddressId: AddressProps
  ): Promise<void> {
    const aAddress = Address.with(
      hospitalAddressId.addressId,
      hospitalAddressId.addressStreet,
      hospitalAddressId.addressDistrict,
      hospitalAddressId.addressCity,
      hospitalAddressId.addressState,
      hospitalAddressId.addressCep,
      hospitalAddressId.addressNumber
    );

    await this.repositoryAddress.update(aAddress);

    const aHospital = Hospital.with(
      hospitalId,
      hospitalName,
      hospitalDescription,
      hospitalAddressId.addressId
    );

    await this.repository.update(aHospital);
  }
}
