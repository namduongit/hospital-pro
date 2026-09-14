export interface RoleItem {
    uuid: string;
    name: string;
    desc: string;
    isDefault: boolean;
    status: number;
    accountCount: number;
}

export interface CreateRolePayload {
  name: string;
  desc: string;
  isDefault: boolean;
  status: number;
}

export interface UpdateRolePayload {
  name?: string;
  desc?: string;
  isDefault?: boolean;
  status?: number;
}