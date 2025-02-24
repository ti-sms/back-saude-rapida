import { Hospital } from "../../entities/hospital/hospital";

 
 export interface HospitalRepository {
   list(): Promise<Hospital[]>;
   update(hospital: Hospital): Promise<void>;
   find(id:string): Promise<Hospital | null>;
   save(hospital: Hospital): Promise<string>;
 }
 