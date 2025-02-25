import { Address } from "../../entities/address/address";

export interface AddressRepository {
    save(address: Address): Promise<string>;
    update(address: Address): Promise<void>;
    find(id: string): Promise<Address | null>;
    findManyByIds(id: string[]): Promise<Address[]>;
}