import { AddressProps } from "../address/address";

export type HospitalProps = {
  hospitalId: string;
  hospitalName: string;
  hospitalDescription: string | null;
  address_addressId: AddressProps | string;
};

export class Hospital {
  private constructor(readonly props: HospitalProps) {}

  public static create(
    hospitalName: string,
    hospitalDescription: string,
    address_addressId: string
  ) {
    return new Hospital({
      hospitalId: crypto.randomUUID().toString(),
      hospitalName,
      hospitalDescription,
      address_addressId,
    });
  }

  public static with(
    hospitalId: string,
    hospitalName: string,
    hospitalDescription: string,
    address_addressId: AddressProps | string
  ) {
    return new Hospital({
      hospitalId,
      hospitalName,
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

  public get description() {
    return this.props.hospitalDescription;
  }

  public get address_addressId() {
    return this.props.address_addressId;
  }
}
