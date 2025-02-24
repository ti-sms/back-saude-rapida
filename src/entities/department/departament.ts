import { SecretaryProps } from "../secretary/secretary";

export type DepartmentProps = {
  departmentId: string;
  departmentName: string;
  departmentDescription: string | null;
  secretary_secretaryId: SecretaryProps | string;
  secretary?: SecretaryProps;
};

export class Department {
  private constructor(readonly props: DepartmentProps) {}

  public static create(
    departmentName: string,
    departmentDescription: string,
    secretary_secretaryId: SecretaryProps | string,
    secretary?: SecretaryProps
  ) {
    return new Department({
      departmentId: crypto.randomUUID().toString(),
      departmentName: departmentName,
      departmentDescription: departmentDescription,
      secretary_secretaryId: secretary_secretaryId,
      secretary: secretary
    });
  }

  public static with(
    departmentId: string,
    departmentName: string,
    departmentDescription: string,
    secretary_secretaryId: SecretaryProps | string,
    secretary?: SecretaryProps
  ) {
    return new Department({
      departmentId,
      departmentName,
      departmentDescription,
      secretary_secretaryId,
      secretary
    });
  }

  public get id() {
    return this.props.departmentId;
  }

  public get name() {
    return this.props.departmentName;
  }

  public get description() {
    return this.props.departmentDescription;
  }

  public get secretaryId() {
    return this.props.secretary_secretaryId;
  }
  
  public get secretary() {
    return this.props.secretary;
  }
}
