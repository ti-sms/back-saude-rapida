import { Request, Response } from "express";
import { prisma } from "../../../../util/prisma.util";
import { DocumentRepositoryPrisma } from "../../../../repositories/document/prisma/document.repository.prisma";
import { UserRepositoryPrisma } from "../../../../repositories/user/prisma/user.repository.prisma";
import { DocumentServiceImplementation } from "../../../../services/document/implementation/document.service.implementation";
import encryptResponseMiddleware from "../../../../util/encrypt";

export class DocumentController {
  private constructor() {}

  public static build() {
    return new DocumentController();
  }

  public async listDocumentsBySender(request: Request, response: Response) {
    const { id , typeId} = request.params;

    const documentRepository = DocumentRepositoryPrisma.build(prisma);
    const userRepository = UserRepositoryPrisma.build(prisma);
    const hDocument = DocumentServiceImplementation.build(
      documentRepository,
      userRepository
    );

    const output = await hDocument.listByIdSender(id, typeId);

    const data = output;

    response.status(200).json(encryptResponseMiddleware(data)).send();
  }

  public async listDocumentsByRecipient(request: Request, response: Response) {
    const { id, typeId } = request.params;

    const documentRepository = DocumentRepositoryPrisma.build(prisma);
    const userRepository = UserRepositoryPrisma.build(prisma);
    const hDocument = DocumentServiceImplementation.build(
      documentRepository,
      userRepository
    );

    const output = await hDocument.listByIdRecipient(id, typeId);

    const data = output;

    response.status(200).json(encryptResponseMiddleware(data)).send();
  }

  public async findDocument(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const documentRepository = DocumentRepositoryPrisma.build(prisma);
      const userRepository = UserRepositoryPrisma.build(prisma);
      const hDocument = DocumentServiceImplementation.build(
        documentRepository,
        userRepository
      );

      const output = await hDocument.findDocument(id);

      const data = {
        id: output.id,
        sequence: output.sequence,
        state: output.state,
        dateCreate: output.dateCreate,
        dateAccept: output.dateAccept,
        title: output.title,
        body: output.body,
        anexo: output.anexo,
        observations: output.observations,
        senderId: output.senderId,
        recipientid: output.recipientid,
        type_type_id: output.type_type_id,
        recipientPosition: output.recipientPosition,
        userRecipientName: output.userRecipientName,
      };

      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response.status(404).json({ message: "Documento não encontrado" }).send();
    }
  }

  public async create(request: Request, response: Response) {
    try {
      const {
        title,
        body,
        anexo,
        observations,
        senderId,
        recipientid,
        type_type_id,
        recipientPosition,
        userRecipientName,
       } = request.body;

       const documentRepository = DocumentRepositoryPrisma.build(prisma);
       const userRepository = UserRepositoryPrisma.build(prisma);
       const hDocument = DocumentServiceImplementation.build(
         documentRepository,
         userRepository
       );
 
       const output = await hDocument.create(
        title,
        body,
        anexo,
        observations,
        senderId,
        recipientid,
        type_type_id,
        recipientPosition,
        userRecipientName);

      const data = output;
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .json({
          message: "Erro ao cadastrar documento",
        })
        .send();
    }
  }

  public async updateState(request: Request, response: Response) {
    try {
      const { 
        state
       } = request.body;
       const { id } = request.params;

       const documentRepository = DocumentRepositoryPrisma.build(prisma);
       const userRepository = UserRepositoryPrisma.build(prisma);
       const hDocument = DocumentServiceImplementation.build(
         documentRepository,
         userRepository
       );
 
       const output = await hDocument.updateStateAndDateAccept(id,state);

      const data = output;
      response.status(201).json(encryptResponseMiddleware(data)).send();
    } catch (error) {
      response
        .status(500)
        .json({
          message: "Erro ao editar estado do documento",
          error,
        })
        .send();
    }
  }
}
