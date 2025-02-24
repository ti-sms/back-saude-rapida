import { Address, AddressProps } from "../../../entities/address/address";
import { Person, PersonProps } from "../../../entities/person/person";
import { SecretaryProps } from "../../../entities/secretary/secretary";
import { User } from "../../../entities/user/user";
import {
  ListOfHealthSystemProps,
  UserPermission,
  UserPermissionProps,
} from "../../../entities/user/userPermission";
import { AddressRepository } from "../../../repositories/address/address.repository";
import { PersonRepository } from "../../../repositories/person/person.repository";
import { UserRepository } from "../../../repositories/user/user.repository";
import { UserPermissionRepository } from "../../../repositories/user/userPermission.repository";

import { CreateOutputDto, FindOutPutDto, ListOutPutDto } from "../user.service";
import { UserService } from "../user.service";
import { CreateUserPermissionInputDto } from "../userPermission.service";

export class UserServiceImplementation implements UserService {
  private constructor(
    readonly repository: UserRepository,
    readonly repositoryPerson: PersonRepository,
    readonly repositoryAddress: AddressRepository,
    readonly repositoryPermission: UserPermissionRepository
  ) {}

  public static build(
    repository: UserRepository,
    repositoryPerson: PersonRepository,
    repositoryAddress: AddressRepository,
    repositoryPermission: UserPermissionRepository
  ) {
    return new UserServiceImplementation(
      repository,
      repositoryPerson,
      repositoryAddress,
      repositoryPermission
    );
  }

  public async create(
    position: string,
    email: string,
    password: string,
    signature: string | null,
    susKey: string | null,
    person: PersonProps,
    departmentId: string,
    permission: CreateUserPermissionInputDto
  ): Promise<CreateOutputDto> {
    const aAddress = Address.create(
      (person.address_addressId as AddressProps).addressStreet ?? "",
      (person.address_addressId as AddressProps).addressDistrict ?? "",
      (person.address_addressId as AddressProps).addressCity ?? "",
      (person.address_addressId as AddressProps).addressState ?? "",
      (person.address_addressId as AddressProps).addressCep ?? "",
      (person.address_addressId as AddressProps).addressNumber ?? ""
    );

    const idAddress = await this.repositoryAddress.save(aAddress);

    const aPerson = Person.create(
      person.personName,
      person.personCpf,
      person.personCNS,
      person.personPhone,
      idAddress
    );

    const idperson = await this.repositoryPerson.save(aPerson);

    const aUser = User.create(
      position,
      email,
      password,
      signature ?? "",
      susKey ?? "",
      idperson,
      departmentId
    );

    const idUser = await this.repository.save(aUser);

    const aUserPermission = UserPermission.create(
      permission.status,
      permission.type,
      idUser,
      permission.systemId
    );

    await this.repositoryPermission.save(aUserPermission);

    const output: CreateOutputDto = {
      id: idUser,
    };

    return output;
  }

  public async list(): Promise<ListOutPutDto[]> {
    const aUser = await this.repository.list();

    const user = aUser.map((u) => {
      return {
        id: u.id,
        position: u.position,
        email: u.email,
        password: u.password,
        signature: u.signature,
        susKey: u.suskey,
        personId: u.personId,
        departmentId: u.department,
      };
    });

    const output: ListOutPutDto[] = user;
    return output;
  }

  public async find(userId: string): Promise<FindOutPutDto> {
    const aUser = await this.repository.find(userId);

    if (!aUser) {
      throw new Error("O usuário não foi encontrado");
    }

    const aUserPermission = await this.repositoryPermission.list(userId);

    const userPermission = aUserPermission.map((u) => {
      return {
        id: u.id,
        status: u.status,
        userId: u.user as string,
        type: u.type,
        systemId: {
          id: (u.listHealth as ListOfHealthSystemProps).listOfHealthSystemId,
          name: (u.listHealth as ListOfHealthSystemProps).listOfHealthSystemName,
          description: (u.listHealth as ListOfHealthSystemProps).listOfHealthSystemDescription,
        } 
      };
    });

    const output: FindOutPutDto = {
      id: aUser.id,
      position: aUser.position,
      email: aUser.email,
      password: aUser.password,
      signature: aUser.signature,
      susKey: aUser.suskey,
      person: aUser.personId,
      department: aUser.department,
      permissions: userPermission
    };

    return output;
  }

  public async update(
    id: string,
    position: string,
    email: string,
    password: string,
    signature: string | null,
    susKey: string | null,
    personId: string,
    departmentId: string
  ): Promise<void> {
    const aUser = User.with(
      id,
      position,
      email,
      password,
      signature ?? "",
      susKey ?? "",
      personId,
      departmentId
    );

    await this.repository.update(aUser);
  }
}
