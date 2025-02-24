import { PrismaClient } from "@prisma/client";
import { HospitalRepository } from "../hospital.repository";
import { Hospital } from "../../../entities/hospital/hospital";

export class HospitalRepositoryPrisma implements HospitalRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new HospitalRepositoryPrisma(prisma);
  }

  public async save(hospital: Hospital): Promise<string> {
    const data = {
     hospitalId: hospital.id,
     hospitalName: hospital.name,
     hospitalStatus: hospital.status,
     hospitalDescription: hospital.description,
     hospitalAddressId_fk: hospital.address as string
    };

    const response = await this.prisma.hospital.create({ data });
    return response.hospitalId;
  }

  public async update(hospital: Hospital): Promise<void> {
    const data = {
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        hospitalStatus: hospital.status,
        hospitalDescription: hospital.description,
        hospitalAddressId_fk: hospital.address as string
    };

    await this.prisma.hospital.update({
      where: {
        hospitalId: hospital.id,
      },
      data,
    });
  }

  public async find(id: string): Promise<Hospital | null> {
    const aHospital = await this.prisma.hospital.findUnique({
      where: { hospitalId: id }
    });

    if (!aHospital) {
      return null;
    }

    const { 
        hospitalId,
        hospitalName,
        hospitalStatus,
        hospitalDescription,
        hospitalAddressId_fk
    } =
      aHospital;

    const hospital = Hospital.with(
        hospitalId,
        hospitalName,
        hospitalStatus,
        hospitalDescription ?? "",
        hospitalAddressId_fk
    );

    return hospital;
  }

  public async list(): Promise<Hospital[]> {
    const aHospital = await this.prisma.hospital.findMany();

    const hospital: Hospital[] = aHospital.map((h) => {
      const {
        hospitalId,
        hospitalName,
        hospitalStatus,
        hospitalDescription,
        hospitalAddressId_fk
      } = h;
      return Hospital.with(
        hospitalId,
        hospitalName,
        hospitalStatus,
        hospitalDescription ?? "",
        hospitalAddressId_fk
      );
    });

    return hospital;
  }
}
