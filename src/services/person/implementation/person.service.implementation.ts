import { Address, AddressProps } from "../../../entities/address/address";
import { Person } from "../../../entities/person/person";
import { AddressRepository } from "../../../repositories/address/address.repository";
import { PersonRepository } from "../../../repositories/person/person.repository";

import {
  CreateOutputDto,
  FindOutPutDto,
  ListOutPutDto,
  PersonService,
} from "../person.service";

export class PersonServiceImplementation implements PersonService {
  private constructor(
    readonly repository: PersonRepository,
    readonly repositoryAddress: AddressRepository
  ) {}

  public static build(
    repository: PersonRepository,
    repositoryAddress: AddressRepository
  ) {
    return new PersonServiceImplementation(repository, repositoryAddress);
  }

  public async create(
    personName: string,
    personCpf: string,
    personCNS: string | null,
    personPhone: string | null,
    address_addressId: AddressProps
  ): Promise<CreateOutputDto> {
    const aAddress = Address.create(
      address_addressId.addressStreet ?? "",
      address_addressId.addressDistrict ?? "",
      address_addressId.addressCity ?? "",
      address_addressId.addressState ?? "",
      address_addressId.addressCep ?? "",
      address_addressId.addressNumber ?? ""
    );

    await this.repositoryAddress.save(aAddress);

    const aPerson = Person.create(
      personName,
      personCpf,
      personCNS,
      personPhone,
      aAddress.id
    );

    await this.repository.save(aPerson);

    const output: CreateOutputDto = {
      id: aPerson.id,
    };

    return output;
  }

  public async find(personId: string): Promise<FindOutPutDto> {
    const aPerson = await this.repository.find(personId);

    if (!aPerson) {
      throw new Error("A pessoa não foi encontrada");
    }

    const output: FindOutPutDto = {
      id: aPerson.id,
      name: aPerson.name,
      cpf: aPerson.cpf,
      cns: aPerson.cns,
      phone: aPerson.phone,
      address_addressId: aPerson.address as AddressProps,
    };

    return output;
  }

  public async list(): Promise<ListOutPutDto[]> {
    const aPerson = await this.repository.list();

    const person = aPerson.map((h) => {
      return {
        id: h.id,
        name: h.name,
        cpf: h.cpf,
        cns: h.cns,
        phone: h.phone,
        address_addressId: h.address as AddressProps ,
      };
    });

    const output: ListOutPutDto[] = person;
    return output;
  }

  public async update(
    personId: string,
    personName: string,
    personCpf: string,
    personCNS: string | null,
    personPhone: string | null,
    address_addressId: AddressProps
  ): Promise<void> {
    const aPerson = Person.with(
      personId,
      personName,
      personCpf,
      personCNS,
      personPhone,
      address_addressId.addressId
    );
    try {
      await this.repository.update(aPerson);
      
      const aAddress = Address.with(
        address_addressId.addressId,
        address_addressId.addressStreet ?? "",
        address_addressId.addressDistrict ?? "",
        address_addressId.addressCity ?? "",
        address_addressId.addressState ?? "",
        address_addressId.addressCep ?? "",
        address_addressId.addressNumber ?? ""
      );
  
      await this.repositoryAddress.update(aAddress);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
