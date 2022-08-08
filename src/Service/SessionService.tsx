import { ApiService } from "./api";

class SessionService extends ApiService {
  constructor() {
    super();
  }

  async session(
    email: string | undefined,
    password: string | undefined
  ) {
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