import React from "react";
import { ApiService } from "./api";
import { axiosResponse } from "./types";

class TaskService extends ApiService {
  constructor() {
    super();
  }

  async getAll(): Promise<axiosResponse> {
    return await this.api()
      .get(`/task`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async exclude(id: number): Promise<axiosResponse> {
    return await this.api()
      .delete(`/task/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async update(id: number): Promise<axiosResponse> {
    return await this.api()
      .put(`/task/${id}`, {})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new TaskService();