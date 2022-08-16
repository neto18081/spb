import axios from "axios";

const api = axios.create({
  baseURL: "https://sistema-para-ecommerce.vercel.app/api/",
});

export default api;
