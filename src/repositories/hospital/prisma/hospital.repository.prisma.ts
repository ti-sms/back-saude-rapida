import { PrismaClient } from "@prisma/client";
import { HospitalRepository } from "../hospital.repository";
import { Hospital } from "../../../entities/hospital/hospital";

export class HospitalRepositoryPrisma implements HospitalRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new HospitalRepositoryPrisma(prisma);
  }

  public async save(hospital: Hospital): Promise<void> {
    const data = {
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      hospitalDescription: hospital.description,
      address_addressId: hospital.address_addressId as string,
    };

    await this.prisma.hospital.create({
      data,
    });
  }

  public async update(hospital: Hospital): Promise<void> {
    const data = {
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      hospitalStatus: hospital.status,
      hospitalDescription: hospital.description,
      address_addressId: hospital.address_addressId as string,
    };

    await this.prisma.hospital.update({
      where: {
        hospitalId: hospital.id,
      },
      data,
    });
  }

  public async patch(id: string, status: number): Promise<void> {
    await this.prisma.hospital.update({
      where: {
        hospitalId: id,
      },
      data: { hospitalStatus: status },
    });
  }

  public async find(hospitalId: string): Promise<Hospital | null> {
    const aHospital = await this.prisma.hospital.findUnique({
      where: { hospitalId: hospitalId },
      include: { address: true },
    });

    if (!aHospital) {
      return null;
    }

    const { hospitalName, hospitalStatus, hospitalDescription } = aHospital;

    const address = Hospital.with(
      hospitalId,
      hospitalName ?? "",
      hospitalStatus,
      hospitalDescription ?? "",
      aHospital.address
    );

    return address;
  }

  public async list(): Promise<Hospital[]> {
    const aHospital = await this.prisma.hospital.findMany({
      include: { address: true },
    });

    const hospital: Hospital[] = aHospital.map((h) => {
      const {
        hospitalId,
        hospitalName,
        hospitalStatus,
        hospitalDescription,
        address,
      } = h;
      return Hospital.with(
        hospitalId,
        hospitalName ?? "",
        hospitalStatus,
        hospitalDescription ?? "",
        address
      );
    });

    return hospital;
  }
}
