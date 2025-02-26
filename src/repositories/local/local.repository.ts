import { Local } from "../../entities/local/local";

 export interface LocalRepository {
   list(): Promise<Local[]>;
   update(local: Local): Promise<void>;
   find(id:string): Promise<Local | null>;
   save(local: Local): Promise<string>;
 }
 