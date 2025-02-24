import { DepartmentProps } from "../../entities/department/departament";
import { PersonProps } from "../../entities/person/person";

export type LoginOutPutDto = {
  id: string;
  position: string;
  email: string;
  password: string;
  signature: string | null;
  susKey: string | null;
  person: PersonProps | string;
  department: DepartmentProps | string;
  permissions: {
    id: string;
    status: number;
    userId: string;
    type: string;
    systemId: {
      id: string;
      name: string;
      description: string;
    };
  }[];
};

export interface LoginService {
  login(email: string, senha: string, systemId: string): Promise<LoginOutPutDto>;
}
