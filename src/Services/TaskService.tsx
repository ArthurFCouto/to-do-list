import React from "react";
import { ApiService } from "./api";
import { axiosResponse } from "./types";

class TaskService extends ApiService {
  private url = "/task";

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

  async save(task: string, deadline: Date): Promise<axiosResponse> {
    const body = {
      task,
      deadline
    }
    return await this.api()
      .post(`${this.url}`, body)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return this.error(error);
      });
  }

  async update(id: number): Promise<axiosResponse> {
    return await this.api()
      .put(`${this.url}/${id}`, {})
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return this.error(error);
      });
  }
}

export default new TaskService();