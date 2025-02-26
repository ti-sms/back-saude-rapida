import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { AddressRepositoryPrisma } from "../../../../repositories/address/prisma/address.repository.prisma";
import encryptResponseMiddleware from "../../../../util/encrypt";
import { HospitalRepositoryPrisma } from "../../../../repositories/hospital/prisma/hospital.repository.prisma";
import { HospitalServiceImplementation } from "../../../../services/hospital/implementation/hospital.service.implementation";
import { LocalRepositoryPrisma } from "../../../../repositories/local/prisma/local.prisma.repository";
import { LocalServiceImplementation } from "../../../../services/local/implementation/local.service.implementation";

export class LocalController {
  private constructor() {}

  public static build() {
    return new LocalController();
  }

  public async list(request: Request, response: Response) {
    const localRepository = LocalRepositoryPrisma.build(prisma);
    const addressRepository = AddressRepositoryPrisma.build(prisma);
    const hLocal = LocalServiceImplementation.build(
      localRepository,
      addressRepository
    ); 

    const output = await hLocal.list();

    const data = output;

    response.status(200).json(encryptResponseMiddleware(data)).send();
  }

  public async find(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const localRepository = LocalRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hLocal = LocalServiceImplementation.build(
        localRepository,
        addressRepository
      );

      const output = await hLocal.find(id);

      const data = {
        id: output.id,
        name: output.name,
        address: output.address,
      };

      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response.status(404).json({ message: "Pessoa não encontrada" }).send();
    }
  }

  public async create(request: Request, response: Response) {
    try {
      const { name, status, address } = request.body;

      const localRepository = LocalRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hLocal = LocalServiceImplementation.build(
        localRepository,
        addressRepository
      );

      const output = await hLocal.create(name, status, address);

      const data = output;
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .json({
          message: "Erro ao cadastrar local",
        })
        .send();
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { name, status, address } = request.body;
      const { id } = request.params;

      const localRepository = LocalRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hLocal = LocalServiceImplementation.build(
        localRepository,
        addressRepository
      );

      const output = await hLocal.update(id, name, status, address);

      const data = {
        id: output,
      };
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response
        .status(500)
        .json({
          message: "Erro ao editar local",
          error,
        })
        .send();
    }
  }
}
