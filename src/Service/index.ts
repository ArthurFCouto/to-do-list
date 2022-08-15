import axios, { AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';
import { Body, Headers, ServiceResponse, ServiceRoute } from './types';
import { modelResponseError } from '../Util';
import Config from '../Config';

class ApiService {
    request: AxiosInstance;
    url: string;

    constructor(request: AxiosInstance, service: ServiceRoute) {
        this.request = request;
        this.url = `/${service}`;
    }

    static init(service: ServiceRoute) {
        const headers: Headers = { 'Content-Type': 'application/json' };
        const cookies = parseCookies();
        if (cookies.USER_TOKEN)
            headers.Authorization = `Bearer ${cookies.USER_TOKEN}`;
        const request = axios.create({
            baseURL: `${Config.baseUrl}`,
            headers
        });
        return new this(request, service);
    }

    async get(): Promise<ServiceResponse> {
        return await this.request
            .get(this.url)
            .then((response) => response)
            .catch((error) => modelResponseError(error));
    }

    async getById(id: string | number): Promise<ServiceResponse> {
        return await this.request
            .get(`${this.url}/${id}`)
            .then((response) => response)
            .catch((error) => modelResponseError(error));
    }

    async delete(id: string | number): Promise<ServiceResponse> {
        return await this.request
            .delete(`${this.url}/${id}`)
            .then((response) => response)
            .catch((error) => modelResponseError(error));
    }

    async post(body: Body): Promise<ServiceResponse> {
        return await this.request
            .post(this.url, body)
            .then((response) => response)
            .catch((error) => modelResponseError(error));
    }

    async update(id: string | number, body: Body): Promise<ServiceResponse> {
        return await this.request
            .put(`${this.url}/${id}`, body)
            .then((response) => response)
            .catch((error) => modelResponseError(error));
    }
}

export default ApiService;