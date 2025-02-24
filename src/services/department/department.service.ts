import { SecretaryProps } from "../../entities/secretary/secretary";

export type ListOutPutDto = {
  departmentId: string;
  departmentName: string;
  departmentDescription: string | null;
  secretary_secretaryId: SecretaryProps | string;
};

export interface DepartmentService {
  list(): Promise<ListOutPutDto[]>;
}
