import React from "react";
import { ApiService } from "./api";
import { axiosResponse } from "./types";

class UserService extends ApiService {
  constructor() {
    super();
  }

  async getAll(): Promise<axiosResponse> {
    return await this.api()
      .get(`/user`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async exclude(id: number): Promise<axiosResponse> {
    return await this.api()
      .delete(`/user/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async getInfo(id: number): Promise<axiosResponse> {
    return await this.api()
      .get(`/user/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new UserService();