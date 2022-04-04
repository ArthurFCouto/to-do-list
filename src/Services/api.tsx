import React from "react";
import axios from "axios";
import Config from "../Config";
import { parseCookies } from "nookies";

const api = axios.create({
  baseURL: `${Config.baseUrl}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

const headers = {
  "Content-Type": "application/json",
  "Authorization": ""
}

export class ApiService {

  api() {
    const cookies = parseCookies();
    if (cookies.USER_TOKEN) {
      const token = cookies.USER_TOKEN;
      headers.Authorization = `Bearer ${token}`;
    }
    return axios.create({
      baseURL: `${Config.baseUrl}`,
      headers
    });
  }
}