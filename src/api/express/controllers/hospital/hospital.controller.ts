import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { AddressRepositoryPrisma } from "../../../../repositories/address/prisma/address.repository.prisma";
import { PersonRepositoryPrisma } from "../../../../repositories/person/prisma/person.repository.prisma";
import { PersonServiceImplementation } from "../../../../services/person/implementation/person.service.implementation";
import encryptResponseMiddleware from "../../../../util/encrypt";
import { HospitalRepositoryPrisma } from "../../../../repositories/hospital/prisma/hospital.repository.prisma";
import { HospitalServiceImplementation } from "../../../../services/hospital/implementation/hospital.service.implementation";

export class HospitalController {
  private constructor() {}

  public static build() {
    return new HospitalController();
  }

  public async list(request: Request, response: Response) {
    const hospitalRepository = HospitalRepositoryPrisma.build(prisma);
    const addressRepository = AddressRepositoryPrisma.build(prisma);
    const hHospital = HospitalServiceImplementation.build(
      hospitalRepository,
      addressRepository
    );

    const output = await hHospital.list();

    const data = output;

    response.status(200).json(encryptResponseMiddleware(data)).send();
  }

  public async find(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const hospitalRepository = HospitalRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hHospital = HospitalServiceImplementation.build(
        hospitalRepository,
        addressRepository
      );

      const output = await hHospital.find(id);

      const data = {
        id: output.id,
        name: output.name,
        description: output.description,
        address: output.address,
      };

      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response.status(404).json({ message: "Pessoa não encontrada" }).send();
    }
  }

  public async create(request: Request, response: Response) {
    try {
      const { name, status, description, address } = request.body;

      const hospitalRepository = HospitalRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hHospital = HospitalServiceImplementation.build(
        hospitalRepository,
        addressRepository
      );

      const output = await hHospital.create(name, status, description, address);

      const data = output;
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .json({
          message: "Erro ao cadastrar hospital",
        })
        .send();
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { name, status, description, address } = request.body;
      const { id } = request.params;

      const hospitalRepository = HospitalRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hHospital = HospitalServiceImplementation.build(
        hospitalRepository,
        addressRepository
      );

      const output = await hHospital.update(
        id,
        name,
        status,
        description,
        address
      );

      const data = {
        id: output,
      };
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response
        .status(500)
        .json({
          message: "Erro ao editar hospital",
          error,
        })
        .send();
    }
  }
}
