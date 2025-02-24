import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { PersonProps } from "../../../../entities/person/person";
import { DepartmentProps } from "../../../../entities/department/departament";
import { UserPermissionRepositoryPrisma } from "../../../../repositories/user/prisma/userPermision.repository.prisma";
import { LoginServiceImplementation } from "../../../../services/authentication/implementation/login.service.implementation";
import { LoginRepositoryPrisma } from "../../../../repositories/authentication/prisma/login.repository.prisma";
import encryptResponseMiddleware from "../../../../util/encrypt";

export class LoginController {
  private constructor() {}

  public static build() {
    return new LoginController();
  }

  public async login(request: Request, response: Response) {
    try {
        const { email, password, systemId } = request.body;

      const userPermissionRepository = UserPermissionRepositoryPrisma.build(prisma);
      const loginRepository = LoginRepositoryPrisma.build(prisma);
      const hLogin = LoginServiceImplementation.build(
        loginRepository,
        userPermissionRepository
      );

      const output = await hLogin.login(email, password, systemId);

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
      response.status(404).json({ message: error }).send();
    }
  }

}
