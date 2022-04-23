import React from "react";
import { ApiService } from "./api";
import { axiosResponse } from "./types";

class SessionService extends ApiService {
  constructor() {
    super();
  }

  async session(
    email: string | undefined,
    password: string | undefined
  ): Promise<axiosResponse> {
    const body = {
      email,
      password
    };
    return await this.api()
      .post(`/session`, body)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return this.error(error);
      });
  }
}

export default new SessionService();