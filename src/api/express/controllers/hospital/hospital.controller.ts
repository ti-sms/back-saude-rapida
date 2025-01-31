import { Request, Response } from "express";
import { HospitalRepositoryPrisma } from "../../../../repositories/hospital/prisma/hospital.repository.prisma";
import { prisma } from "../../../../util/prisma.util";
import { HospitalServiceImplementation } from "../../../../services/hospital/implementation/hospital.service.implementation";
import { AddressRepositoryPrisma } from "../../../../repositories/address/prisma/address.repository.prisma";

export class HospitalControler {
    private constructor(){}

    public static build(){
        return new HospitalControler();
    }

    public async create(request: Request, response: Response) {
        const {name, description, addressSchema} = request.body;

        const hospitalRepository = HospitalRepositoryPrisma.build(prisma);
        const addressRepository = AddressRepositoryPrisma.build(prisma);
        const hService = HospitalServiceImplementation.build(hospitalRepository, addressRepository);

        const output = await hService.create(
            name,
            description,
            addressSchema
        );

        const data = {
            id: output
        };
        response.status(201).json(data).send();
    }
}