import { User } from "../../entities/user/user";

export interface LoginRepository {
    login(email: string, password: string): Promise<User>;
}