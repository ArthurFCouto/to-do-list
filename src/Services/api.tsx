import React from "react";
import axios from "axios";
import { baseUrl } from "../Config/variables";

const api = axios.create({
  baseURL: `${baseUrl}`,
});

export default api;
