import { Address, AddressProps } from "../../../entities/address/address";
import { Secretary } from "../../../entities/secretary/secretary";
import { SecretaryRepository } from "../../../repositories/secretary/secretary.repository";

import { ListOutPutDto, SecretaryService } from "../secretary.service";

export class SecretaryServiceImplementation implements SecretaryService {
  private constructor(readonly repository: SecretaryRepository) {}

  public static build(repository: SecretaryRepository) {
    return new SecretaryServiceImplementation(repository);
  }

  public async list(): Promise<ListOutPutDto[]> {
    const aSecretary = await this.repository.list();

    const secretary = aSecretary.map((h) => {
      return {
        id: h.id,
        name: h.name,
        description: h.description,
      };
    });

    const output: ListOutPutDto[] = secretary;
    return output;
  }

}
