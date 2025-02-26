import { PrismaClient } from "@prisma/client";
import { Hospital } from "../../../entities/hospital/hospital";
import { LocalRepository } from "../local.repository";
import { Local } from "../../../entities/local/local";

export class LocalRepositoryPrisma implements LocalRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new LocalRepositoryPrisma(prisma);
  }

  public async save(local: Local): Promise<string> {
    const data = {
     localId: local.id,
     localName: local.name,
     localStatus: local.status,
     localAddresId_fk: local.address as string
    };

    const response = await this.prisma.local.create({ data });
    return response.localId;
  }

  public async update(local: Local): Promise<void> {
    const data = {
        localId: local.id,
     localName: local.name,
     localStatus: local.status,
     localAddresId_fk: local.address as string
    };

    await this.prisma.local.update({
      where: {
        localId: local.id,
      },
      data,
    });
  }

  public async find(id: string): Promise<Local | null> {
    const aLocal = await this.prisma.local.findUnique({
      where: { localId: id }
    });

    if (!aLocal) {
      return null;
    }

    const { 
        localId,
        localName,
        localStatus,
        localAddresId_fk,
    } =
    aLocal;

    const local = Local.with(
        localId,
        localName ?? "",
        localStatus,
        localAddresId_fk,
    );

    return local;
  }

  public async list(): Promise<Local[]> {
    const aLocal = await this.prisma.local.findMany();

    const local: Local[] = aLocal.map((h) => {
      const {
        localId,
        localName,
        localStatus,
        localAddresId_fk,
      } = h;
      return Local.with(
        localId,
        localName ?? "",
        localStatus,
        localAddresId_fk,
      );
    });

    return local;
  }
}
