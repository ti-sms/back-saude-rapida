import { User } from "../../entities/user/user";

export interface UserRepository {
  save(user: User): Promise<string>;
  update(user: User): Promise<void>;
  find(id: string): Promise<User | null>;
  findMany(usersId: string[]): Promise<User[]>;
  list(): Promise<User[]>;
}
