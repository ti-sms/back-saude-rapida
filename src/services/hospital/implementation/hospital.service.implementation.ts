import { Address, AddressProps } from "../../../entities/address/address";
import { Hospital } from "../../../entities/hospital/hospital";
import { Person } from "../../../entities/person/person";
import { AddressRepository } from "../../../repositories/address/address.repository";
import { HospitalRepository } from "../../../repositories/hospital/hospital.repository";
import {
  CreateOutputDto,
  FindOutPutDto,
  HospitalService,
  ListOutPutDto,
} from "../hospital.service";
import { updateAddresses } from "../util/updateAddressHospital.service";

export class HospitalServiceImplementation implements HospitalService {
  private constructor(
    readonly repository: HospitalRepository,
    readonly repositoryAddress: AddressRepository
  ) {}

  public static build(
    repository: HospitalRepository,
    repositoryAddress: AddressRepository
  ) {
    return new HospitalServiceImplementation(repository, repositoryAddress);
  }

  public async create(
    name: string,
    status: number,
    description: string,
    address: AddressProps
  ): Promise<CreateOutputDto> {
    
    const aAddress = Address.create(
      address.addressStreet ?? "",
      address.addressDistrict ?? "",
      address.addressCity ?? "",
      address.addressState ?? "",
      address.addressCep ?? "",
      address.addressNumber ?? ""
    );

    await this.repositoryAddress.save(aAddress);

    const aHospital = Hospital.create(name, status, description, aAddress.id);

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

    const aAddress = await this.repositoryAddress.find(
      aHospital.address as string
    );

    const output: FindOutPutDto = {
      id: aHospital.id,
      name: aHospital.name,
      status: aHospital.status,
      description: aHospital.description,
      address: {
        addressId: aAddress?.id ?? "",
        addressStreet: aAddress?.street ?? "",
        addressDistrict: aAddress?.district ?? "",
        addressCity: aAddress?.city ?? "",
        addressState: aAddress?.state ?? "",
        addressCep: aAddress?.cep ?? "",
        addressNumber: aAddress?.number ?? "",
      },
    };

    return output;
  }

  public async list(): Promise<ListOutPutDto[]> {
    const aHospital = await this.repository.list();
    let listId: string[] = [];
    const hospital = aHospital.map((h) => {
      listId.push(h.address as string);
      return {
        id: h.id,
        name: h.name,
        description: h.description,
        address: h.address,
        status: h.status,
      };
    });

    const listAddress = await this.repositoryAddress.findManyByIds(listId);

    const output: ListOutPutDto[] = updateAddresses(listAddress, hospital);
    return output;
  }

  public async update(
    id: string,
    name: string,
    status: number,
    description: string,
    address: string
  ): Promise<void> {
    const aHospital = Hospital.with(id, name, status, description, address);
    try {
      await this.repository.update(aHospital);

    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
