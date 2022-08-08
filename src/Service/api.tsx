import axios from "axios";
import Config from "../Config";
import { parseCookies } from "nookies";

const headers = {
  "Content-Type": "application/json",
  "Authorization": ""
};

export class ApiService {

  api() {
    const cookies = parseCookies();
    if (cookies.USER_TOKEN) 
      headers.Authorization = `Bearer ${cookies.USER_TOKEN}`;
    return axios.create({
      baseURL: `${Config.baseUrl}`,
      headers
    });
  }

  error(error: any) {
    return error.response
      ? error.response
      : 
        {
          status: 500,
          data: {
            error: "Network error"
          },
          statusText: "Network error"
        }
  }
}