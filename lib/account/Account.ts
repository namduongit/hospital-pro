import { Api } from "../api";
import { API_ERRORS } from "../errors";
import { Pagination } from "../pagination";
import {
    AccountItem,
    AccountDetail,
    CreateAccountPayload,
    UpdateAccountPayload,
    UpdateDoctorProfilePayload,
    DoctorProfile,
} from "./IAccount";

export class Account {
    private api: Api;

    constructor() {
        this.api = new Api();
    }

    public async GetAll(page = 1, pageSize = 10): Promise<Pagination<AccountItem>> {
        const response = await this.api.Get<Pagination<AccountItem>>(
            `/api/Account?page=${page}&pageSize=${pageSize}`
        );
        if (!response) {
            throw new Error(API_ERRORS.FETCH_FAILED);
        }
        return response;
    }

    public async GetDetail(id: string): Promise<AccountDetail> {
        const response = await this.api.Get<AccountDetail>(`/api/Account/${id}`);
        if (!response) {
            throw new Error(API_ERRORS.FETCH_FAILED);
        }
        return response;
    }

    public async Create(data: CreateAccountPayload): Promise<AccountItem> {
        const response = await this.api.Post<AccountItem>("/api/Account", data);
        if (!response) {
            throw new Error(API_ERRORS.CREATE_FAILED);
        }
        return response;
    }

    public async Update(id: string, data: UpdateAccountPayload): Promise<AccountItem> {
        const response = await this.api.Put<AccountItem>(`/api/Account/${id}`, data);
        if (!response) {
            throw new Error(API_ERRORS.UPDATE_FAILED);
        }
        return response;
    }

    public async Delete(id: string): Promise<void> {
        try {
            await this.api.Delete(`/api/Account/${id}`);
        } catch (error) {
            throw new Error(API_ERRORS.DELETE_FAILED);
        }
    }

    public async UpdateDoctorProfile(
        id: string,
        data: UpdateDoctorProfilePayload
    ): Promise<DoctorProfile> {
        const response = await this.api.Put<DoctorProfile>(
            `/api/Account/${id}/doctor-profile`,
            data
        );
        if (!response) {
            throw new Error(API_ERRORS.UPDATE_FAILED);
        }
        return response;
    }
}
