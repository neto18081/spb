import axios from "axios";

const api = axios.create({
  baseURL: "https://sistema-para-ecommerce.vercel.app/api/",
  // baseURL: "http://localhost:3000/api/",
});

export default api;
