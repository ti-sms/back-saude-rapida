import { Hospital } from "../../entities/hospital/hospital";

export interface HospitalRepository {
    save(hospital: Hospital): Promise<void>;
    update(hospital: Hospital): Promise<void>;
    find(id: string): Promise<Hospital | null>;
}