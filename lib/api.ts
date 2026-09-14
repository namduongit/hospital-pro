import axios, { AxiosInstance } from "axios";

export class Api {
    private client: AxiosInstance;

    constructor() {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL;
        if (!API_BASE) {
            throw new Error("Not found API BASE");
        }
        const stored = localStorage.getItem("accessToken") || "";
        this.client = axios.create({
            baseURL:  API_BASE,
            headers: {
                Authorization: `Bearer ${stored}`
            }
        });

        this.client.interceptors.response.use(
            (res) => {
                return res;
            }, 
            (err) => {
                return Promise.reject(err);
            }
        )
    }

    public async Get<T>(path: string): Promise<T | undefined> {
        const res = await this.client.get<T>(path);
        return res.data;
    }

    public async Post<T>(path: string, data?: any): Promise<T | undefined> {
        const res = await this.client.post<T>(path, data);
        return res.data;
    }

    public async Put<T>(path: string, data?: any): Promise<T | undefined> {
        const res = await this.client.put<T>(path, data);
        return res.data;
    }

    public async Delete<T>(path: string): Promise<T | undefined> {
        const res = await this.client.delete<T>(path);
        return res.data;
    }
}