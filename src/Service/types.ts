import { AxiosResponse } from "axios";

export type Headers = {
  "Content-Type": string;
  Authorization?: string;
}

export interface ServiceResponse extends AxiosResponse {
  error?: string;
}

interface User {
  name: string;
  email: string;
  password: string;
}

interface Task {
  task: string;
  deadline: Date;
}

interface Login {
  email?: string;
  password?: string;
}

export type Body = User | Task | Login;