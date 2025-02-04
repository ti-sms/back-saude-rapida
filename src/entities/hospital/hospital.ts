import { AddressProps } from "../address/address";

export type HospitalProps = {
  hospitalId: string;
  hospitalName: string;
  hospitalStatus: number;
  hospitalDescription: string | null;
  address_addressId: AddressProps | string;
};

export class Hospital {
  private constructor(readonly props: HospitalProps) {}

  public static create(
    hospitalName: string,
    hospitalStatus: number,
    hospitalDescription: string | null,
    address_addressId: string | AddressProps
  ) {
    return new Hospital({
      hospitalId: crypto.randomUUID().toString(),
      hospitalName,
      hospitalStatus,
      hospitalDescription,
      address_addressId,
    });
  }

  public static with(
    hospitalId: string,
    hospitalName: string,
    hospitalStatus: number,
    hospitalDescription: string | null,
    address_addressId: AddressProps | string
  ) {
    return new Hospital({
      hospitalId,
      hospitalName,
      hospitalStatus,
      hospitalDescription,
      address_addressId,
    });
  }

  public get id() {
    return this.props.hospitalId;
  }

  public get name() {
    return this.props.hospitalName;
  }

  public get status() {
    return this.props.hospitalStatus;
  }

  public get description() {
    return this.props.hospitalDescription;
  }

  public get address_addressId() {
    return this.props.address_addressId;
  }
}
