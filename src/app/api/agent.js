import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../store/store";

axios.defaults.baseURL = "http://localhost:4000";

const responseBody = (response) => response.data;
axios.defaults.withCredentials = true;

/**
 * Este interceptor se encarga de añadir el token de autenticación a las peticiones
 * que se realicen al servidor.
 */

axios.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

/**
 * Este interceptor se encarga de capturar las solicitudas y capturar las respuestas que se produzcan en las peticiones
 * al servidor y de mostrarlos en la consola.
 */

const requests = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
};

const Login = {
  login: (email, password) => requests.post("user/login", { email, password }),
};

const GetUsers = {
  getUsers: () => requests.get("user/getUsers"),
};

const Update = {
  update: (user) => requests.put(`user/updateUser/`, { user }),
};

const GetParkings = {
  getParkings: () => requests.get("parking/getParkings"),
  getParking: (parkingId) => requests.get(`parking/getParking/${parkingId}`),
};

const EditParking = {
  editParking: (newParking) =>
    requests.put(`parking/editParking`, { newParking }),
};

const GetReservations = {
  getReservations: () => requests.get("/reservations/history"),
};

const Search = {
  searchUser: (searchData) => requests.post("user/searchUser", { searchData }),
};

const agent = {
  Login,
  GetUsers,
  Update,
  GetParkings,
  EditParking,
  GetReservations,
  Search,
};

export default agent;
