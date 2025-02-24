import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { DocumentTypeServiceImplementation } from "../../../../services/document/implementation/documentType.service.implementation";
import { DocumentTypeRepositoryPrisma } from "../../../../repositories/document/prisma/documentType.repository.prisma";
import encryptResponseMiddleware from "../../../../util/encrypt";

export class DocumentTypeController {
  private constructor() {}

  public static build() {
    return new DocumentTypeController();
  }

  public async listDocumentsType(request: Request, response: Response) {

    const documentTypeRepository = DocumentTypeRepositoryPrisma.build(prisma);
    const hDocumentType = DocumentTypeServiceImplementation.build(
        documentTypeRepository
    );

    const output = await hDocumentType.listDocumentType();

    const data = output;

    response.status(200).json(encryptResponseMiddleware(data)).send();
  }


}
