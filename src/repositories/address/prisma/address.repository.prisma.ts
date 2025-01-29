import { PrismaClient } from "@prisma/client";
import { AddressRepository } from "../address.repository";
import { Address } from "../../../entities/address/address";

export class AddressRepositoryPrisma implements AddressRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new AddressRepositoryPrisma(prisma);
  }

  public async save(address: Address): Promise<void> {
    const data = {
      addressId: address.id,
      addressStreet: address.street,
      addressDistrict: address.district,
      addressCity: address.city,
      addressState: address.state,
      addressCep: address.cep,
      addressNumber: address.number
    };

    await this.prisma.address.create({ data });
  }

  public async update(address: Address): Promise<void> {

    const data = {
      addressId: address.id,
      addressStreet: address.street,
      addressDistrict: address.district,
      addressCity: address.city,
      addressState: address.state,
      addressCep: address.cep,
      addressNumber: address.number
    };

    await this.prisma.address.update({
      where: {
        addressId: address.id,
      },
      data,
    });
  }

  public async find(addressId: string): Promise<Address | null> {

    const aAddress = await this.prisma.address.findUnique({
      where: { addressId },
    });

    if (!aAddress) {
      return null;
    }

    const {
      addressStreet,
      addressDistrict,
      addressCity,
      addressState,
      addressCep,
      addressNumber
    } = aAddress;

    const address = Address.with( 
      addressId,
      addressStreet,
      addressDistrict,
      addressCity,
      addressState,
      addressCep,
      addressNumber
    );

    return address;
}
}
