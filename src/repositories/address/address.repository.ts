import { Address } from "../../entities/address/address";

export interface AddressRepository {
    save(address: Address): Promise<void>;
    update(address: Address): Promise<void>;
    find(id: string): Promise<Address>;
}