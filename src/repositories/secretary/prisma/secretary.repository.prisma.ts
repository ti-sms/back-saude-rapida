import { PrismaClient } from "@prisma/client";
import { SecretaryRepository } from "../secretary.repository";
import { Secretary } from "../../../entities/secretary/secretary";

export class SecretaryRepositoryPrisma implements SecretaryRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new SecretaryRepositoryPrisma(prisma);
  }

  public async list(): Promise<Secretary[]> {
    const aHospital = await this.prisma.secretary.findMany();

    const hospital: Secretary[] = aHospital.map((h) => {
      const { secretaryId, secretaryName, secretaryDescription } = h;
      return Secretary.with(secretaryId, secretaryName, secretaryDescription);
    });

    return hospital;
  }
}
