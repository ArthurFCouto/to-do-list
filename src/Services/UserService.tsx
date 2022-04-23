import React from "react";
import { ApiService } from "./api";
import { axiosResponse } from "./types";

class UserService extends ApiService {
  private url = "/user";

  constructor() {
    super();
  }

  async getAll(): Promise<axiosResponse> {
    return await this.api()
      .get(`${this.url}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return this.error(error);
      });
  }

  async exclude(id: number): Promise<axiosResponse> {
    return await this.api()
      .delete(`${this.url}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return this.error(error);
      });
  }

  async getInfo(id: number): Promise<axiosResponse> {
    return await this.api()
      .get(`${this.url}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return this.error(error);
      });
  }

  async save(name: string, email: string, password: string) {
    const body = {
      name,
      email,
      password,
    };
    return await this.api()
      .post(`${this.url}`, body)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return this.error(error);
      });
  }
}

export default new UserService();