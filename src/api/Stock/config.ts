import axios from "axios";

const stockApi = axios.create({
  baseURL: 'http://localhost:8080',
});

export default stockApi;