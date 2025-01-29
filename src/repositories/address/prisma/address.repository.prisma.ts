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
      addressState: address.state,
      addressCity: address.city,
      addressCep: address.cep,
      addressDistrict: address.district,
      addressNumber: address.number,
    };

    await this.prisma.address.create({ data });
  }

  public async update(address: Address): Promise<void> {
    const data = {
      addressId: address.id,
      addressStreet: address.street,
      addressState: address.state,
      addressCity: address.city,
      addressCep: address.cep,
      addressDistrict: address.district,
      addressNumber: address.number,
    };

    await this.prisma.address.update({
      where: {
        addressId: address.id,
      },
      data,
    });
  }

  public async find(addressId: string): Promise<Address | null> {
    console.log("find");
    const aAddress = await this.prisma.address.findUnique({
      where: { addressId },
    });

    if (!aAddress) {
      return null;
    }

    const {
      addressStreet,
      addressState,
      addressCity,
      addressCep,
      addressDistrict,
      addressNumber,
    } = aAddress;

    const address = Address.with( 
      addressId,
      addressStreet,
      addressState,
      addressCity,
      addressDistrict,
      addressNumber,
      addressCep
    );

    return address;
}
}
