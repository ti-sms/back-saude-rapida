import { AddressProps } from "../address/address";

export type LocalProps = {
  localId: string;
  localName: string;
  localStatus: number;
  localAddress: string | AddressProps;
};

export class Local {
  private constructor(readonly props: LocalProps) {}

  public static create(
    localName: string,
    localStatus: number,
    localAddress: string | AddressProps
  ) {
    return new Local({
      localId: crypto.randomUUID().toString(),
      localName: localName,
      localStatus: localStatus,
      localAddress: localAddress,
    });
  }

  public static with(
    localId: string,
    localName: string,
    localStatus: number,
    localAddress: string | AddressProps
  ) {
    return new Local({
      localId,
      localName,
      localStatus,
      localAddress,
    });
  }

  public get id() {
    return this.props.localId;
  }

  public get name() {
    return this.props.localName;
  }

  public get status() {
    return this.props.localStatus;
  }

  public get address() {
    return this.props.localAddress;
  }
}
