import { PrismaClient } from "@prisma/client";
import { Address } from "../../../entities/address/address";
import { PersonRepository } from "../person.repository";
import { Person } from "../../../entities/person/person";

export class PersonRepositoryPrisma implements PersonRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new PersonRepositoryPrisma(prisma);
  }

  public async save(person: Person): Promise<string> {
    const data = {
      personId: person.id,
      personName: person.name,
      personCpf: person.cpf,
      personCNS: person.cns,
      personPhone: person.phone,
      address_addressId: person.addressId as string
    };

    const response = await this.prisma.person.create({ data });
    return response.personId;
  }

  public async update(person: Person): Promise<void> {
    const data = {
      personId: person.id,
      personName: person.name,
      personCpf: person.cpf,
      personCNS: person.cns,
      personPhone: person.phone,
      address_addressId: person.addressId as string,
    };

    await this.prisma.person.update({
      where: {
        personId: person.id,
      },
      data,
    });
  }

  public async find(personId: string): Promise<Person | null> {
    const aPerson = await this.prisma.person.findUnique({
      where: { personId },
      include:{address: true}
    });

    if (!aPerson) {
      return null;
    }

    const { personName, personCpf, personCNS, personPhone, address_addressId } =
      aPerson;

    const person = Person.with(
      personId,
      personName,
      personCpf,
      personCNS,
      personPhone,
      address_addressId
    );

    return person;
  }

  public async list(): Promise<Person[]> {
    const aPerson = await this.prisma.person.findMany({
      include: { address: true },
    });

    const hospital: Person[] = aPerson.map((h) => {
      const {
        personId,
        personName,
        personCpf,
        personCNS,
        personPhone,
        address_addressId
      } = h;
      return Person.with(
        personId,
        personName,
        personCpf,
        personCNS,
        personPhone,
        address_addressId
      );
    });

    return hospital;
  }
}
