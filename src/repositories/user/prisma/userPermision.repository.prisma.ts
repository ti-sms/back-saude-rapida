import { PrismaClient } from "@prisma/client";
import { UserPermissionRepository } from "../userPermission.repository";
import { ListOfHealthSystemProps, UserPermission, UserPermissionProps } from "../../../entities/user/userPermission";

export class UserPermissionRepositoryPrisma implements UserPermissionRepository {
  private constructor(readonly prisma: PrismaClient) { }

  public static build(prisma: PrismaClient) {
    return new UserPermissionRepositoryPrisma(prisma);
  }

  public async list(userId?: string): Promise<UserPermission[]> {
    const aUserPermission = await this.prisma.userpermision.findMany({
      where: { user_userId: userId },
      include: { listofhealthsystem: true },
    });

    const userPermission: UserPermission[] = aUserPermission.map((u) => {
      const {
        userPermissionId,
        userStatus,
        userPermisionType,
        user_userId,
        listofhealthsystem
      } = u;

      return UserPermission.with(
        userPermissionId,
        userStatus,
        userPermisionType,
        user_userId,
        listofhealthsystem as ListOfHealthSystemProps
      );
    });

    return userPermission;
  }

  public async save(userPermission: UserPermission): Promise<string> {
    const data = {
      userPermissionId: userPermission.id,
      userStatus: userPermission.status,
      userPermisionType: userPermission.type,
      user_userId: userPermission.user as string,
      listOfHealthSystem_listOfHealthSystemId: userPermission.listHealth as string
    };

    const response = await this.prisma.userpermision.create({ data });
    return response.userPermissionId;
  }

  public async update(userPermission: UserPermission): Promise<void> {
    const data = {
      userPermissionId: userPermission.id,
      userStatus: userPermission.status,
      userPermisionType: userPermission.type,
      user_userId: userPermission.user as string,
      listOfHealthSystem_listOfHealthSystemId: userPermission.listHealth as string
    };

    await this.prisma.userpermision.update({
      where: {
        userPermissionId: userPermission.id,
      },
      data,
    });
  }
}
