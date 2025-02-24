import { PrismaClient } from "@prisma/client";
import { Secretary } from "../../../entities/secretary/secretary";
import { UserRepository } from "../user.repository";
import { User } from "../../../entities/user/user";

export class UserRepositoryPrisma implements UserRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new UserRepositoryPrisma(prisma);
  }

  public async save(user: User): Promise<string> {
    const data = {
      userId: user.id,
      userPosition: user.position,
      userEmail: user.email,
      userPassword: user.password,
      userSignature: user.signature ?? "",
      userSusKey: user.suskey ?? "",
      person_personId: user.personId as string,
      department_departmentId: user.department as string,
    };

    const response = await this.prisma.user.create({ data });
    return response.userId;
  }

  public async update(user: User): Promise<void> {
    const data = {
      userId: user.id,
      userPosition: user.position,
      userEmail: user.email,
      userPassword: user.password,
      userSignature: user.signature ?? "",
      userSusKey: user.suskey ?? "",
      person_personId: user.personId as string,
      department_departmentId: user.department as string,
    };

    await this.prisma.user.update({
      where: {
        userId: user.id,
      },
      data,
    });
  }

  public async find(userId: string): Promise<User | null> {
    const aUser = await this.prisma.user.findUnique({
      where: { userId },
      include: {
        department: {
          include: { secretary: true },
        },
        person: {
          include: { address: true },
        },
      },
    });

    if (!aUser) {
      return null;
    }

    const {
      userPosition,
      userEmail,
      userPassword,
      userSignature,
      userSusKey,
      person,
      department,
    } = aUser;

    const user = User.with(
      userId,
      userPosition,
      userEmail,
      userPassword,
      userSignature as string,
      userSusKey as string,
      person,
      department
    );

    return user;
  }

  public async findMany(usersId: string[]): Promise<User[]> {
    const aUser = await this.prisma.user.findMany({
      where: { OR: [{ userId: usersId[0] }, { userId: usersId[1] }] },
      include: {
        department: {
          include: { secretary: true },
        },
        person: {
          include: { address: true },
        },
      },
    });

    if (!aUser) {
      return [];
    }

    const user: User[] = aUser.map((u) => {
      const {
        userId,
        userPosition,
        userEmail,
        userPassword,
        userSignature,
        userSusKey,
        person,
        department,
      } = u;

      return User.with(
        userId,
        userPosition,
        userEmail,
        userPassword,
        userSignature as string,
        userSusKey as string,
        person,
        department
      );
    });

    return user;
  }

  public async list(): Promise<User[]> {
    const aUser = await this.prisma.user.findMany({
      include: { person: true, department: true },
    });

    const user: User[] = aUser.map((u) => {
      const {
        userId,
        userPosition,
        userEmail,
        userPassword,
        userSignature,
        userSusKey,
        person,
        department,
      } = u;

      return User.with(
        userId,
        userPosition,
        userEmail,
        userPassword,
        userSignature as string,
        userSusKey as string,
        person,
        department
      );
    });

    return user;
  }
}
