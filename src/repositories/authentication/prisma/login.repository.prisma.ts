import { PrismaClient } from "@prisma/client";
import { Address } from "../../../entities/address/address";
import { LoginRepository } from "../login.repository";
import { User } from "../../../entities/user/user";

export class LoginRepositoryPrisma implements LoginRepository {
  private constructor(readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new LoginRepositoryPrisma(prisma);
  }

  public async login(email: string, password: string): Promise<User> {
    const alogin = await this.prisma.user.findUnique({
      where: { userEmail: email },
      include: {
        person: {
          include: {
            address: true,
          },
        },
        department: {
          include: {
            secretary: true,
          },
        },
      },
    });

    if (!alogin) {
      throw new Error("Usuário inexistente");
    } else {
      if (alogin.userPassword !== password) {
        throw new Error("Senha inválida");
      }
    }

    const {
      userId,
      userPosition,
      userEmail,
      userPassword,
      userSignature,
      userSusKey,
      person,
      department,
    } = alogin;

    const login = User.with(
      userId,
      userPosition,
      userEmail,
      userPassword,
      userSignature as string,
      userSusKey as string,
      person,
      department
    );

    return login;
  }
}
