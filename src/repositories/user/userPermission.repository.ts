import { UserPermission } from "../../entities/user/userPermission";

export interface UserPermissionRepository {
  save(userPermission: UserPermission): Promise<string>;
  update(userPermission: UserPermission): Promise<void>;
  list(userId?: string): Promise<UserPermission[]>;
}
