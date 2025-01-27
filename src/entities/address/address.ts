export type AddressProps = {
  id: string;
  street?: string;
  district?: string;
  number?: string;
  city?: string;
  state?: string;
  cep?: string;
};

export class Address {
    private constructor (readonly props: AddressProps){}

    public static create(street: string, district: string, number: string, city: string, state: string, cep:string ) {
        return new Address({
            id: crypto.randomUUID().toString(),
            street,
            district,
            number,
            city,
            state,
            cep
        })
    }

    public get address(){
        return {
            id: this.props.id,
            street: this.props.street,
            district: this.props.district,
            number: this.props.number,
            city: this.props.city,
            state: this.props.state,
            cep: this.props.cep
        }
    }
}