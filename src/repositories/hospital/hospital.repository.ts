import { Hospital } from "../../entities/hospital/hospital";

export interface HospitalRepository {
    save(hospital: Hospital): Promise<void>;
    update(hospital: Hospital): Promise<void>;
    patch(id: string, status: number): Promise<void>;
    find(id: string): Promise<Hospital | null>;
    list(): Promise<Hospital[]>;
}