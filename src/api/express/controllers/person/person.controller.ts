import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { AddressRepositoryPrisma } from "../../../../repositories/address/prisma/address.repository.prisma";
import { PersonRepositoryPrisma } from "../../../../repositories/person/prisma/person.repository.prisma";
import { PersonServiceImplementation } from "../../../../services/person/implementation/person.service.implementation";
import encryptResponseMiddleware from "../../../../util/encrypt";

export class PersonController {
  private constructor() {}

  public static build() {
    return new PersonController();
  }

  public async list(request: Request, response: Response) {
    const personRepository = PersonRepositoryPrisma.build(prisma);
    const addressRepository = AddressRepositoryPrisma.build(prisma);
    const hPerson = PersonServiceImplementation.build(
      personRepository,
      addressRepository
    );

    const output = await hPerson.list();

    const data = output;

    response.status(200).json(encryptResponseMiddleware(data)).send();
  }

  public async find(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const personRepository = PersonRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hPerson = PersonServiceImplementation.build(
        personRepository,
        addressRepository
      );

      const output = await hPerson.find(id);

      const data = {
        name: output.name,
        cpf: output.cpf,
        cns: output.cns,
        phone: output.phone,
        addressSchema: output,
      };

      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response.status(404).json({ message: "Pessoa não encontrada" }).send();
    }
  }

  public async create(request: Request, response: Response) {
    try {
      const { name, cpf, cns, phone, addressSchema, dataa } = request.body;
      
      const personRepository = PersonRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hPerson = PersonServiceImplementation.build(
        personRepository,
        addressRepository
      );

      const output = await hPerson.create(name, cpf, cns, phone, addressSchema);

      const data = output;
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response
        .status(500)
        .json({
          message: "Erro ao cadastrar pessoa",
        })
        .send();
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { name, cpf, cns, phone, addressSchema } = request.body;
      const { id } = request.params;

      const personRepository = PersonRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hPerson = PersonServiceImplementation.build(
        personRepository,
        addressRepository
      );

      const output = await hPerson.update(
        id,
        name,
        cpf,
        cns,
        phone,
        addressSchema
      );

      const data = {
        id: output,
      };
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response
        .status(500)
        .json({
          message: "Erro ao editar pessoa",
          error,
        })
        .send();
    }
  }
}
