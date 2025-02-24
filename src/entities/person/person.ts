import { AddressProps } from "../address/address";

export type PersonProps = {
  personId: string;
  personName: string;
  personCpf: string;
  personCNS: string | null;
  personPhone: string | null;
  address_addressId: AddressProps | string;
  address?: AddressProps;
};

export class Person {
  private constructor(readonly props: PersonProps) {}

  public static create(
    personName: string,
    personCpf: string,
    personCNS: string | null,
    personPhone: string | null,
    address_addressId: AddressProps | string
  ) {
    return new Person({
      personId: crypto.randomUUID().toString(),
      personName,
      personCpf,
      personCNS,
      personPhone,
      address_addressId,
    });
  }

  public static with(
    personId: string,
    personName: string,
    personCpf: string,
    personCNS: string | null,
    personPhone: string | null,
    address_addressId: AddressProps | string,
    address?: AddressProps
  ) {
    return new Person({
      personId,
      personName,
      personCpf,
      personCNS,
      personPhone,
      address_addressId,
      address
    });
  }

  public get id(){
    return this.props.personId;
  }

  public get name(){
    return this.props.personName;
  }

  public get cpf(){
    return this.props.personCpf;
  }

  public get cns(){
    return this.props.personCNS;
  }

  public get phone(){
    return this.props.personPhone;
  }

  public get addressId(){
    return this.props.address_addressId;
  }

  public get address(){
    return this.props.address;
  }
}
