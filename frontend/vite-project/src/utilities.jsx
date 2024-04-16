import axios from "axios";

// Shortcut base url for api calls
export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });