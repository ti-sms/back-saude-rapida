import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { UserPermissionRepositoryPrisma } from "../../../../repositories/user/prisma/userPermision.repository.prisma";
import { UserPermissionServiceImplementation } from "../../../../services/user/implementation/userPermission.implementation";
import encryptResponseMiddleware from "../../../../util/encrypt";

export class UserPermissionController {
    private constructor() { }

    public static build() {
        return new UserPermissionController();
    }

    public async list(request: Request, response: Response) {
        const { id } = request.params;

        const userPermissionRepository = UserPermissionRepositoryPrisma.build(prisma);
        const hUserPermission = UserPermissionServiceImplementation.build(
            userPermissionRepository
        );
       
        const output = await hUserPermission.list(id);

        const data = output;

        response.status(200).json(encryptResponseMiddleware(data)).send();
    }

    public async create(request: Request, response: Response) {
        try {
            const {
                status,
                type,
                userId,
                listHelthSystemId
            } = request.body;

            const userPermissionRepository = UserPermissionRepositoryPrisma.build(prisma);
            const hUserPermission = UserPermissionServiceImplementation.build(
                userPermissionRepository
            );

            const output = await hUserPermission.create(
                status,
                type,
                userId,
                listHelthSystemId
            );

            const data = output;
            response.status(201).json(encryptResponseMiddleware(data)).send();
        } catch (error) {
            console.log(error);
            response
                .status(500)
                .json({
                    message: "Erro ao cadastrar permissões de usuário",
                })
                .send();
        }
    }

    public async update(request: Request, response: Response) {
        try {
            const {
                status,
                type,
                userId,
                listHelthSystemId
            } = request.body;
            const { id } = request.params;

            const userPermissionRepository = UserPermissionRepositoryPrisma.build(prisma);
            const hUserPermission = UserPermissionServiceImplementation.build(
                userPermissionRepository
            );

            const output = await hUserPermission.update(
                id,
                status,
                type,
                userId,
                listHelthSystemId
            );
            const data = {
                id: output,
            };
            response.status(201).json(encryptResponseMiddleware(data)).send();
        } catch (error) {
            response
                .status(500)
                .json({
                    message: "Erro ao editar permissões de usuário",
                    error: error
                })
                .send();
        }
    }
}
