import { PermissionItem } from "./IPermission";
import { API_ERRORS } from "../errors";
import { Api } from "../api";
import { Pagination } from "../pagination";

export class Permission {
    private api: Api;
    
    constructor() {
        this.api = new Api();
    }

    public async GetAll(page = 1, pageSize = 100): Promise<Pagination<PermissionItem>> {
        const response = await this.api.Get<Pagination<PermissionItem>>(
            `/api/permission?page=${page}&pageSize=${pageSize}`
        );
        if (!response) {
            throw new Error(API_ERRORS.FETCH_FAILED);
        }
        return response;
    }
}
