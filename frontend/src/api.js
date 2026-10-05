import axios from "axios";

const API = axios.create({
  baseURL: "https://blogsphere-backend-znsv.onrender.com/api"
});

export default API;