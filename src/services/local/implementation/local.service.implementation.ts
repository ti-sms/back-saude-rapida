import { Address, AddressProps } from "../../../entities/address/address";
import { Local } from "../../../entities/local/local";
import { AddressRepository } from "../../../repositories/address/address.repository";
import { LocalRepository } from "../../../repositories/local/local.repository";
import { updateAddressesOnEntityList } from "../../../util/updateAddressHospital.service";
import { CreateOutputDto, FindOutPutDto, ListOutPutDto } from "../local.service";


export class LocalServiceImplementation implements LocalServiceImplementation {
  private constructor(
    readonly repository: LocalRepository,
    readonly repositoryAddress: AddressRepository
  ) {}

  public static build(
    repository: LocalRepository,
    repositoryAddress: AddressRepository
  ) {
    return new LocalServiceImplementation(repository, repositoryAddress);
  }

  public async create(
    name: string,
    status: number,
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

    const aLocal = Local.create(name, status, aAddress.id);

    await this.repository.save(aLocal);

    const output: CreateOutputDto = {
      id: aLocal.id,
    };

    return output;
  }

  public async find(id: string): Promise<FindOutPutDto> {
    const aLocal = await this.repository.find(id);

    if (!aLocal) {
      throw new Error("O local não foi encontrado");
    }

    const aAddress = await this.repositoryAddress.find(
      aLocal.address as string
    );

    const output: FindOutPutDto = {
      id: aLocal.id,
      name: aLocal.name,
      status: aLocal.status,
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
    const aLocal = await this.repository.list();
    let listId: string[] = [];
    const local = aLocal.map((h) => {
      listId.push(h.address as string);
      return {
        id: h.id,
        name: h.name,
        address: h.address,
        status: h.status,
      };
    });

    const listAddress = await this.repositoryAddress.findManyByIds(listId);

    const output: ListOutPutDto[] = updateAddressesOnEntityList(listAddress, local);
    return output;
  }

  public async update(
    id: string,
    name: string,
    status: number,
    address: string
  ): Promise<void> {
    const aLocal = Local.with(id, name, status, address);
    try {
      await this.repository.update(aLocal);

    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}
