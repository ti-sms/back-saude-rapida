import { HospitalRepository } from "../../../repositories/hospital/hospital.repository";
import { CreateOutputDto, HospitalService } from "../hospital.service";

export class HospitalServiceImplementation implements HospitalService {
    private constructor(readonly: Hospital){}

    public static build(repository: HospitalRepository){
        return new HospitalServiceImplementation(repository);
    }

    public async create(
        hospitalName: string,
        hospital
    ): Promise<CreateOutputDto> {
        
    }
}