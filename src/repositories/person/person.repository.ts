import { Person } from "../../entities/person/person";

export interface PersonRepository {
    save(person: Person): Promise<string>;
    update(person: Person): Promise<void>;
    find(id: string): Promise<Person | null>;
    list(): Promise<Person[]>;

}