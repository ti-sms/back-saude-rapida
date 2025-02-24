import { UserProps } from "../../entities/user/user";
import { ListOfHealthSystemProps } from "../../entities/user/userPermission";

export type ListOutPutDto = {
  id: string;
  status: number;
  type: string;
  userId: UserProps;
  listHelthSystem: ListOfHealthSystemProps
};

export type CreateOutputDto = {
  id: string;
};

export type CreateUserPermissionInputDto = {
  id?:string;
  status: number;
  type: string;
  userId: string;
  systemId: string | ListOfHealthSystemProps;
};

export interface UserPermissionService {
  list(userId?: string): Promise<ListOutPutDto[]>;
  create(
    status: number,
    type: string,
    userId: string,
    listHelthSystem: string
  ): Promise<CreateOutputDto>;
  update(
    id: string,
    status: number,
    type: string,
    userId: string,
    listHelthSystem: string
  ): Promise<void>;
}
