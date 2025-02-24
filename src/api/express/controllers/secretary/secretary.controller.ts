import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { SecretaryRepositoryPrisma } from "../../../../repositories/secretary/prisma/secretary.repository.prisma";
import { SecretaryServiceImplementation } from "../../../../services/secretary/implementation/secretary.service.implementation";
import encryptResponseMiddleware from "../../../../util/encrypt";

export class SecretaryController {
  private constructor() {}

  public static build() {
    return new SecretaryController();
  }

  public async list(request: Request, response: Response) {
    const secretaryRepository = SecretaryRepositoryPrisma.build(prisma);
    const hSecretary = SecretaryServiceImplementation.build(secretaryRepository);

    const output = await hSecretary.list();

    const data = output;

    response.status(200).json(encryptResponseMiddleware(data)).send();
  }

}
