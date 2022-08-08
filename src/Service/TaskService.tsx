import { ApiService } from "./api";

class TaskService extends ApiService {
  private url = "/task";

  constructor() {
    super();
  }

  async getAll() {
    return await this.api()
      .get(`${this.url}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return this.error(error);
      });
  }

  async exclude(id: number) {
    return await this.api()
      .delete(`${this.url}/${id}`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return this.error(error);
      });
  }

  async save(task: string, deadline: Date) {
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

  async update(id: number) {
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