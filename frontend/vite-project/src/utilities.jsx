import axios from "axios";

// Shortcut base url for api calls
export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

  // Regular expression for email validation
  export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
