 import { Department } from "../../entities/department/departament";
 
 export interface DepartmentRepository {
   list(): Promise<Department[]>;
 }
 