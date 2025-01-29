export type AddressProps = {
  addressId: string;
  addressStreet: string | null;
  addressDistrict: string | null;
  addressCity: string | null;
  addressState: string | null;
  addressCep: string | null;
  addressNumber: string | null;
};

export class Address {
    private constructor (readonly props: AddressProps){}

    public static create(addressStreet: string, addressDistrict: string, addressCity: string, addressState: string, addressCep:string, addressNumber: string ) {
        return new Address({
            addressId: crypto.randomUUID().toString(),
            addressStreet,
            addressDistrict,
            addressCity,
            addressState,
            addressCep,
            addressNumber
        })
    }

    public static with(addressId: string, addressStreet: string | null, addressDistrict:  string | null, addressCity:  string | null, addressState:  string | null, addressCep:  string | null, addressNumber: string | null) {
        return new Address({
            addressId,
            addressStreet,
            addressDistrict,
            addressCity,
            addressState,
            addressCep,
            addressNumber
        });
    }
    
    public get id(){
        return this.props.addressId;
    }

    public get street(){
        return this.props.addressStreet;
    }

    public get district(){
        return this.props.addressDistrict;
    }
     
    public get number(){
        return this.props.addressNumber;
    }

    public get city(){
        return this.props.addressCity;
    }

    public get state(){
        return this.props.addressState;
    }

    public get cep(){
        return this.props.addressCep;
    }

}