import { AddressRepository } from "../../../repositories/address/address.repository";
import { DepartmentRepository } from "../../../repositories/department/department.repository";
import { PersonRepository } from "../../../repositories/person/person.repository";
import { DepartmentService, ListOutPutDto } from "../department.service";

export class DepartmentServiceImplementation implements DepartmentService {
  private constructor(readonly repository: DepartmentRepository) {}

  public static build(repository: DepartmentRepository) {
    return new DepartmentServiceImplementation(repository);
  }

  public async list(): Promise<ListOutPutDto[]> {
    const aDepartment = await this.repository.list();

    const departament = aDepartment.map((d) => {
      return {
        departmentId: d.id,
        departmentName: d.name,
        departmentDescription: d.description,
        secretary_secretaryId: d.secretaryId,
      };
    });

    const output: ListOutPutDto[] = departament;
    return output;
  }
}
