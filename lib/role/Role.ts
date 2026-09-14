import { RoleItem, CreateRolePayload, UpdateRolePayload } from "./IRole";
import { API_ERRORS } from "../errors";
import { Api } from "../api";
import { Pagination } from "../pagination";

export class Role {
    private api: Api;
    
    constructor() {
        this.api = new Api();
    }

    public async GetAll(page = 1, pageSize = 10): Promise<Pagination<RoleItem>> {
        const response = await this.api.Get<Pagination<RoleItem>>(`/api/Role?page=${page}&pageSize=${pageSize}`);
        if (!response) {
            throw new Error(API_ERRORS.FETCH_FAILED);
        }
        return response;
    }

    public async Create(data: CreateRolePayload): Promise<RoleItem> {
        const response = await this.api.Post<RoleItem>("/api/Role", data);
        if (!response) {
            throw new Error(API_ERRORS.CREATE_FAILED);
        }
        return response;
    }

    public async Update(id: string, data: UpdateRolePayload): Promise<RoleItem> {
        const response = await this.api.Put<RoleItem>(`/api/Role/${id}`, data);
        if (!response) {
            throw new Error(API_ERRORS.UPDATE_FAILED);
        }
        return response;
    }

    public async Delete(id: string): Promise<void> {
        await this.api.Delete(`/api/Role/${id}`);
    }
}