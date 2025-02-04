import { Request, Response } from "express";
import { HospitalRepositoryPrisma } from "../../../../repositories/hospital/prisma/hospital.repository.prisma";
import { prisma } from "../../../../util/prisma.util";
import { HospitalServiceImplementation } from "../../../../services/hospital/implementation/hospital.service.implementation";
import { AddressRepositoryPrisma } from "../../../../repositories/address/prisma/address.repository.prisma";

export class HospitalControler {
  private constructor() {}

  public static build() {
    return new HospitalControler();
  }

  public async list(request: Request, response: Response) {
    const hospitalRepository = HospitalRepositoryPrisma.build(prisma);
    const addressRepository = AddressRepositoryPrisma.build(prisma);
    const hService = HospitalServiceImplementation.build(
      hospitalRepository,
      addressRepository
    );

    const output = await hService.list();

    const data = output;

    response.status(200).json(data).send();
  }

  public async find(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const hospitalRepository = HospitalRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hService = HospitalServiceImplementation.build(
        hospitalRepository,
        addressRepository
      );

      const output = await hService.find(id);

      const data = {
        name: output.name,
        description: output.description,
        addressSchema: {
          addressId: output.hospitalAddressId.addressId,
          addressStreet: output.hospitalAddressId.addressStreet,
          addressDistrict: output.hospitalAddressId.addressDistrict,
          addressState: output.hospitalAddressId.addressState,
          addressCity: output.hospitalAddressId.addressCity,
          addressNumber: output.hospitalAddressId.addressNumber,
          addressCep: output.hospitalAddressId.addressCep,
        },
      };

      response.status(201).json(data).send();
    } catch (error) {
      response.status(404).json({ message: "Hospital não encontrado" }).send();
    }
  }

  public async create(request: Request, response: Response) {
    try {
      const { name, status, description, addressSchema } = request.body;

      const hospitalRepository = HospitalRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hService = HospitalServiceImplementation.build(
        hospitalRepository,
        addressRepository
      );

      const output = await hService.create(name, status, description, addressSchema);

      const data = output;
      response.status(201).json(data).send();
    } catch (error) {
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
      const { name, status, description, addressSchema } = request.body;
      const { id } = request.params;

      const hospitalRepository = HospitalRepositoryPrisma.build(prisma);
      const addressRepository = AddressRepositoryPrisma.build(prisma);
      const hService = HospitalServiceImplementation.build(
        hospitalRepository,
        addressRepository
      );

      const output = await hService.update(
        id,
        name,
        status,
        description,
        addressSchema
      );

      const data = {
        id: output,
      };
      response.status(201).json(data).send();
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .json({
          message: "Erro ao editar hospital",
        })
        .send();
    }
  }

  
}
