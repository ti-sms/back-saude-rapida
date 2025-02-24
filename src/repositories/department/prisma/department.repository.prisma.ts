import { PrismaClient } from "@prisma/client";
import { Department } from "../../../entities/department/departament";
import { DepartmentRepository } from "../department.repository";

export class DepartmentRepositoryPrisma implements DepartmentRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new DepartmentRepositoryPrisma(prisma);
  }

  public async list(): Promise<Department[]> {
    const aDepartment = await this.prisma.department.findMany({
      include: { secretary: true },
    });

    const department: Department[] = aDepartment.map((d) => {
      const { departmentId, departmentName, departmentDescription, secretary } =
        d;
      return Department.with(
        departmentId,
        departmentName,
        departmentDescription as string,
        secretary
      );
    });

    return department;
  }
}
