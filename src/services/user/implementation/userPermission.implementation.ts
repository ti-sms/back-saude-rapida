import { User, UserProps } from "../../../entities/user/user";
import { ListOfHealthSystemProps, UserPermission } from "../../../entities/user/userPermission";
import { UserPermissionRepository } from "../../../repositories/user/userPermission.repository";
import { CreateOutputDto, ListOutPutDto, UserPermissionService } from "../userPermission.service";

export class UserPermissionServiceImplementation implements UserPermissionService {
    private constructor(
        readonly repository: UserPermissionRepository
    ) { }

    public static build(
        repository: UserPermissionRepository
    ) {
        return new UserPermissionServiceImplementation(
            repository
        );
    }

    public async create(
        status: number,
        type: string,
        userId: string,
        listHelthSystem: string
    ): Promise<CreateOutputDto> {

        const aUserPermission = UserPermission.create(
            status,
            type,
            userId,
            listHelthSystem
        );

        const idUserPermission = await this.repository.save(aUserPermission);

        const output: CreateOutputDto = {
            id: idUserPermission,
        };

        return output;
    }

    public async list(userId?: string): Promise<ListOutPutDto[]> {
        const aUserPermisison = await this.repository.list(userId);

        const userPermission = aUserPermisison.map((u) => {
            return {
                id: u.id,
                status: u.status,
                type: u.type,
                userId: u.user as UserProps,
                listHelthSystem: u.listHealth as ListOfHealthSystemProps
            };
        });

        const output: ListOutPutDto[] = userPermission;
        return output;
    }

    public async update(
        id: string,
        status: number,
        type: string,
        userId: string,
        listHelthSystem: string
    ): Promise<void> {
        const aUserPermission = UserPermission.with(
            id,
            status,
            type,
            userId,
            listHelthSystem
        );

        await this.repository.update(aUserPermission);
    }
}
