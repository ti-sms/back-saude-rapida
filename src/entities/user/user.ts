import { AddressProps } from "../address/address";
import { DepartmentProps } from "../department/departament";
import { PersonProps } from "../person/person";
import { SecretaryProps } from "../secretary/secretary";

export type UserProps = {
  userId: string;
  userPosition: string;
  userEmail: string;
  userPassword: string;
  userSignature: string;
  userSusKey: string;
  person_personId: PersonProps | string;
  department_departmentId: DepartmentProps | string;
};

export class User {
  private constructor(readonly props: UserProps) {}

  public static create(
    userPosition: string,
    userEmail: string,
    userPassword: string,
    userSignature: string,
    userSusKey: string,
    person_personId: PersonProps | string,
    department_departmentId: DepartmentProps | string
  ) {
    return new User({
      userId: crypto.randomUUID().toString(),
      userPosition: userPosition,
      userEmail: userEmail,
      userPassword: userPassword,
      userSignature: userSignature,
      userSusKey: userSusKey,
      person_personId: person_personId,
      department_departmentId: department_departmentId,
    });
  }

  public static with(
    userId: string,
    userPosition: string,
    userEmail: string,
    userPassword: string,
    userSignature: string,
    userSusKey: string,
    person_personId: PersonProps | string,
    department_departmentId: DepartmentProps | string,
  ) {
    return new User({
      userId,
      userPosition,
      userEmail,
      userPassword,
      userSignature,
      userSusKey,
      person_personId,
      department_departmentId
    });
  }

  public get id() {
    return this.props.userId;
  }

  public get position() {
    return this.props.userPosition;
  }

  public get email() {
    return this.props.userEmail;
  }

  public get password() {
    return this.props.userPassword;
  }

  public get signature() {
    return this.props.userSignature;
  }

  public get suskey() {
    return this.props.userSusKey;
  }

  public get personId() {
    return this.props.person_personId;
  }

  public get department() {
    return this.props.department_departmentId;
  }
}
