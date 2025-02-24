import { DepartmentProps } from "../department/departament";
import { PersonProps } from "../person/person";
import { UserProps } from "./user";

export type ListOfHealthSystemProps = {
  listOfHealthSystemId: string;
  listOfHealthSystemName: string;
  listOfHealthSystemDescription: string;
};

export type UserPermissionProps = {
  userPermissionId: string;
  userStatus: number;
  userPermisionType: string;
  user_userId: UserProps | string;
  listOfHealthSystem_listOfHealthSystemId: ListOfHealthSystemProps | string;
};

 

export class UserPermission {
  private constructor(readonly props: UserPermissionProps) {}

  public static create(
    userStatus: number,
    userPermisionType: string,
    user_userId: UserProps | string,
    listOfHealthSystem_listOfHealthSystemId: ListOfHealthSystemProps | string
  ) {
    return new UserPermission({
      userPermissionId: crypto.randomUUID().toString(),
      userStatus,
      userPermisionType,
      user_userId,
      listOfHealthSystem_listOfHealthSystemId,
    });
  }

  public static with(
    userPermissionId: string,
    userStatus: number,
    userPermisionType: string,
    user_userId: UserProps | string,
    listOfHealthSystem_listOfHealthSystemId: ListOfHealthSystemProps | string
  ) {
    return new UserPermission({
      userPermissionId,
      userStatus,
      userPermisionType,
      user_userId,
      listOfHealthSystem_listOfHealthSystemId,
    });
  }

  public get id() {
    return this.props.userPermissionId;
  }

  public get status() {
    return this.props.userStatus;
  }

  public get type() {   
    return this.props.userPermisionType;
  }

  public get user() {
    return this.props.user_userId;
  }

  public get listHealth() {
    return this.props.listOfHealthSystem_listOfHealthSystemId;
  }
}
