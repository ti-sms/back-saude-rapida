import { AddressProps } from "../address/address";

export type HospitalProps = {
    hospitalId: string;
    hospitalName: string;
    hospitalStatus: number;
    hospitalDescription: string;
    hospitalAddressId: AddressProps | string;
};


export class Hospital {
  private constructor(readonly props: HospitalProps) {}

  public static create(
    hospitalName: string,
    hospitalStatus: number,
    hospitalDescription: string,
    hospitalAddressId: AddressProps | string,
  ) {
    return new Hospital({
        hospitalId: crypto.randomUUID().toString(),
        hospitalName: hospitalName,
        hospitalStatus: hospitalStatus,
        hospitalDescription: hospitalDescription,
        hospitalAddressId: hospitalAddressId
    });
  }

  public static with(
    hospitalId: string,
    hospitalName: string,
    hospitalStatus: number,
    hospitalDescription: string,
    hospitalAddressId: AddressProps | string,
  ) {
    return new Hospital({
        hospitalId,
        hospitalName,
        hospitalStatus,
        hospitalDescription,
        hospitalAddressId
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

  public get address() {
    return this.props.hospitalAddressId;
  }
}