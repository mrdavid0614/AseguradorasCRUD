import axios from "axios"

const baseURL = import.meta.env.VITE_BASE_URL;

export const aseguradoraApi = axios.create({ baseURL, headers: { token: "1234" } });