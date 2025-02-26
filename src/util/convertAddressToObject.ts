import { Address, AddressProps } from "../entities/address/address";

export function convertAddressToObject(addressList: Address[]): AddressProps[] {
  return addressList.map((address) => {
    return {
      addressId: address.id,
      addressStreet: address.street,
      addressDistrict: address.district,
      addressCity: address.city,
      addressState: address.state,
      addressCep: address.cep,
      addressNumber: address.number,
    };
  });
}
