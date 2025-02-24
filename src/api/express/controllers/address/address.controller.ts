import { Request, Response } from "express";
import { AddressRepositoryPrisma } from "../../../../repositories/address/prisma/address.repository.prisma";

import { AddressServiceImplementation } from "../../../../services/address/implementation/address.service.implementation";
import { prisma } from "../../../../util/prisma.util";
import encryptResponseMiddleware from "../../../../util/encrypt";

export class AddressController {
  private constructor() {}

  public static build() {
    return new AddressController();
  }

  public async find(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const aRepository = AddressRepositoryPrisma.build(prisma);
      const aService = AddressServiceImplementation.build(aRepository);

      const output = await aService.find(id);

      const data = {
        street: output.street,
        district: output.district,
        city: output.city,
        state: output.state,
        cep: output.cep,
        number: output.number,
      };

      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response.status(404).json({ message: "Endereço não encontrado" }).send();
    }
  }

  public async create(request: Request, response: Response) {
    const { street, district, city, state, cep, number } = request.body;

    const aRepository = AddressRepositoryPrisma.build(prisma);
    const aService = AddressServiceImplementation.build(aRepository);

    const output = await aService.create(
      street,
      district,
      city,
      state,
      cep,
      number
    );

    const data = {
      id: output.id,
    };

    response.status(201).json(encryptResponseMiddleware(data)).send();
  }

  public async update(request: Request, response: Response) {
    const { street, district, city, state, cep, number } = request.body;
    const { id } = request.params;

    const aRepository = AddressRepositoryPrisma.build(prisma);
    const aService = AddressServiceImplementation.build(aRepository);

    await aService.update(id, street, district, city, state, cep, number);

    response.status(201).json("Endereço atualizado com sucesso").send();
  }
}
