import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = `https://api.quick-chat.app`;

async function checkIsAuth() {
  return await axios.get("/api/auth/checkAuth");
}

async function loginAPI(data) {
  return await axios.post("/api/auth/login", data);
}

async function registerAPI(data) {
  return await axios.post("api/auth/register", data);
}

async function logoutAPI() {
  return await axios.post("api/auth/logout");
}

export { loginAPI, registerAPI, checkIsAuth, logoutAPI };
