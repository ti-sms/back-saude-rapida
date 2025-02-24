import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { DepartmentRepositoryPrisma } from "../../../../repositories/department/prisma/department.repository.prisma";
import { DepartmentServiceImplementation } from "../../../../services/department/implementation/department.service.implementation";
import encryptResponseMiddleware from "../../../../util/encrypt";

export class DepartmentController {
  private constructor() {}

  public static build() {
    return new DepartmentController();
  }

  public async list(request: Request, response: Response) {
    try {
      const departmentRepository = DepartmentRepositoryPrisma.build(prisma);
      const dDepartment =
        DepartmentServiceImplementation.build(departmentRepository);

      const output = await dDepartment.list();

      const data = output;

      response.status(200).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response.status(500).json(error).send();
    }
  }
}
