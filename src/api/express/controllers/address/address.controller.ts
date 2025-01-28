import { Request, Response } from "express";
import { AddressRepositoryPrisma } from "../../../../repositories/address/prisma/address.repository.prisma";
import { prisma } from "../../../../util/prisma.util";
import { AddressServiceImplementation } from "../../../../services/address/implementation/address.service.implementation";

export class AddressController {
    private constructor(){}

    public static build() {
        return new AddressController();
    }

    public async list(request: Request, response: Response) {
        const {id} = request.body;

        const aRepository = AddressRepositoryPrisma.build(prisma);
        const aService =  AddressServiceImplementation.build(aRepository);

        const output = await aService.create(cep, state , city, street, district, number);

        const data = {
            id: output.id
        };

        response.status(201).json(data).send();
    }

    public async create(request: Request, response: Response) {
        const {cep, state , city, street, district, number} = request.body;

        const aRepository = AddressRepositoryPrisma.build(prisma);
        const aService =  AddressServiceImplementation.build(aRepository);

        const output = await aService.create(cep, state , city, street, district, number);

        const data = {
            id: output.id
        };

        response.status(201).json(data).send();
    }

    public async update(request: Request, response: Response) {
        const {id, cep, state , city, street, district, number} = request.body;

        const aRepository = AddressRepositoryPrisma.build(prisma);
        const aService =  AddressServiceImplementation.build(aRepository);

        await aService.update(id, cep, state , city, street, district, number);

        response.status(201).json('Endereço atualizado com sucesso').send();
    }
}