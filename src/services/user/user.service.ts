import { DepartmentProps } from "../../entities/department/departament";
import { PersonProps } from "../../entities/person/person";
import { CreateUserPermissionInputDto } from "./userPermission.service";

export type FindOutPutDto = {
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
    userId:  string;
    type:  string;
    systemId: {
      id: string;
      name: string;
      description: string;
    }
  }[];
};

export type ListOutPutDto = {
  id: string;
  position: string;
  email: string;
  password: string;
  signature: string | null;
  susKey: string | null;
  personId: PersonProps | string;
  departmentId: DepartmentProps | string;
};

export type CreateOutputDto = {
  id: string;
};

export interface UserService {
  find(id: string): Promise<FindOutPutDto>;
  list(): Promise<ListOutPutDto[]>;
  create(
    position: string,
    email: string,
    password: string,
    signature: string | null,
    susKey: string | null,
    person: PersonProps,
    departmentId: string,
    permission: CreateUserPermissionInputDto
  ): Promise<CreateOutputDto>;
  update(
    id: string,
    position: string,
    email: string,
    password: string,
    signature: string | null,
    susKey: string | null,
    personId: string,
    departmentId: string
  ): Promise<void>;
}
