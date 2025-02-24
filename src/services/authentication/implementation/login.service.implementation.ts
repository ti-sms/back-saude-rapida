import { ListOfHealthSystemProps } from "../../../entities/user/userPermission";
import { LoginRepository } from "../../../repositories/authentication/login.repository";
import { UserPermissionRepository } from "../../../repositories/user/userPermission.repository";
import { LoginOutPutDto, LoginService } from "../login.service";

export class LoginServiceImplementation implements LoginService {
  private constructor(
    readonly repository: LoginRepository,
    readonly repositoryPermission: UserPermissionRepository
  ) {}

  public static build(
    repository: LoginRepository,
    repositoryPermission: UserPermissionRepository
  ) {
    return new LoginServiceImplementation(repository, repositoryPermission);
  }

  public async login(
    email: string,
    password: string,
    systemId: string
  ): Promise<LoginOutPutDto> {
    const aLogin = await this.repository.login(email, password);

    const aUserPermission = await this.repositoryPermission.list(aLogin.id);

    if (
      !aUserPermission.some(
        (obj) =>
          obj.user === aLogin.id &&
          obj.status === 1 &&
          (obj.listHealth as ListOfHealthSystemProps).listOfHealthSystemId === systemId
      )
    ) {
      throw new Error("Usuário não tem permissão necessária");
    }

    const userPermission = aUserPermission.map((u) => {
      return {
        id: u.id,
        status: u.status,
        userId: u.user as string,
        type: u.type,
        systemId: {
          id: (u.listHealth as ListOfHealthSystemProps).listOfHealthSystemId,
          name: (u.listHealth as ListOfHealthSystemProps)
            .listOfHealthSystemName,
          description: (u.listHealth as ListOfHealthSystemProps)
            .listOfHealthSystemDescription,
        },
      };
    });

    const output: LoginOutPutDto = {
      id: aLogin.id,
      position: aLogin.position,
      email: aLogin.email,
      password: aLogin.password,
      signature: aLogin.signature,
      susKey: aLogin.suskey,
      person: aLogin.personId,
      department: aLogin.department,
      permissions: userPermission,
    };

    return output;
  }
}
