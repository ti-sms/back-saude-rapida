import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { UserRepositoryPrisma } from "../../../../repositories/user/prisma/user.repository.prisma";
import { UserServiceImplementation } from "../../../../services/user/implementation/user.service.implementation";
import { PersonRepositoryPrisma } from "../../../../repositories/person/prisma/person.repository.prisma";
import { AddressRepositoryPrisma } from "../../../../repositories/address/prisma/address.repository.prisma";
import { PersonProps } from "../../../../entities/person/person";
import { DepartmentProps } from "../../../../entities/department/departament";
import { UserPermissionRepositoryPrisma } from "../../../../repositories/user/prisma/userPermision.repository.prisma";
import encryptResponseMiddleware from "../../../../util/encrypt";

export class UserController {
  private constructor() {}

  public static build() {
    return new UserController();
  }

  public async list(request: Request, response: Response) {
    const userPermissionRepository = UserPermissionRepositoryPrisma.build(prisma);
    const userRepository = UserRepositoryPrisma.build(prisma);
    const PersonRepository = PersonRepositoryPrisma.build(prisma);
    const AddressRepository = AddressRepositoryPrisma.build(prisma);
    const hUser = UserServiceImplementation.build(
      userRepository,
      PersonRepository,
      AddressRepository,
      userPermissionRepository
    );

    const output = await hUser.list();

    const data = output;

    response.status(200).json(encryptResponseMiddleware(data)).send();
  }

  public async find(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userPermissionRepository = UserPermissionRepositoryPrisma.build(prisma);
      const userRepository = UserRepositoryPrisma.build(prisma);
      const PersonRepository = PersonRepositoryPrisma.build(prisma);
      const AddressRepository = AddressRepositoryPrisma.build(prisma);
      const hUser = UserServiceImplementation.build(
        userRepository,
        PersonRepository,
        AddressRepository,
        userPermissionRepository
      );

      const output = await hUser.find(id);

      const data = {
        id: output.id,
        position: output.position,
        email: output.email,
        password: output.password,
        signature: output.signature,
        susKey: output.susKey,
        person: {
          id: (output.person as PersonProps).personId,
          name: (output.person as PersonProps).personName,
          cpf: (output.person as PersonProps).personCpf,
          phone: (output.person as PersonProps).personPhone,
          cns: (output.person as PersonProps).personCNS,
        },
        address:{
          id: (output.person as PersonProps).address?.addressId,
          street: (output.person as PersonProps).address?.addressStreet,
          district: (output.person as PersonProps).address?.addressDistrict,
          number: (output.person as PersonProps).address?.addressNumber,
          city: (output.person as PersonProps).address?.addressCity,
          state: (output.person as PersonProps).address?.addressState,
          cep: (output.person as PersonProps).address?.addressCep,
        },
        department: {
          id: (output.department as DepartmentProps).departmentId,
          name: (output.department as DepartmentProps).departmentName,
        },
        secretary: {
          id: (output.department as DepartmentProps).secretary?.secretaryId,
          name: (output.department as DepartmentProps).secretary?.secretaryName,
          description: (output.department as DepartmentProps).secretary?.secretaryDescription,
        },
        permissions: output.permissions
      };

      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response.status(404).json({ message: "Usuário não encontrado" }).send();
    }
  }

  public async create(request: Request, response: Response) {
    try {
      const {
        position,
        email,
        password,
        signature,
        susKey,
        person,
        departmentId,
        permission
      } = request.body;

      const userPermissionRepository = UserPermissionRepositoryPrisma.build(prisma);
      const userRepository = UserRepositoryPrisma.build(prisma);
      const PersonRepository = PersonRepositoryPrisma.build(prisma);
      const AddressRepository = AddressRepositoryPrisma.build(prisma);
      const hUser = UserServiceImplementation.build(
        userRepository,
        PersonRepository,
        AddressRepository,
        userPermissionRepository
      );

      const userPermision = {
        status: permission.status,
        type: permission.type,
        userId: '',
        systemId: permission.systemId
      };

      const output = await hUser.create(
        position,
        email,
        password,
        signature,
        susKey,
        person,
        departmentId,
        userPermision
      );

      const data = output;
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .json({
          message: "Erro ao cadastrar usuário",
        })
        .send();
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const {
        position,
        email,
        password,
        signature,
        susKey,
        personId,
        departmentId,
      } = request.body;
      const { id } = request.params;

      const userPermissionRepository = UserPermissionRepositoryPrisma.build(prisma);
      const userRepository = UserRepositoryPrisma.build(prisma);
      const PersonRepository = PersonRepositoryPrisma.build(prisma);
      const AddressRepository = AddressRepositoryPrisma.build(prisma);
      const hUser = UserServiceImplementation.build(
        userRepository,
        PersonRepository,
        AddressRepository,
        userPermissionRepository
      );

      const output = await hUser.update(
        id,
        position,
        email,
        password,
        signature,
        susKey,
        personId,
        departmentId
      );
      const data = {
        id: output,
      };
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response
        .status(500)
        .json({
          message: "Erro ao editar usuário",
        })
        .send();
    }
  }
}
