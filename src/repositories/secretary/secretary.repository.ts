import { Secretary } from "../../entities/secretary/secretary";

export interface SecretaryRepository {
  list(): Promise<Secretary[]>;
}
