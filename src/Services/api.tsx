import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://apitasklist.herokuapp.com/",
});

export default api;
