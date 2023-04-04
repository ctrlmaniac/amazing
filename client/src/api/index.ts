import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  responseType: "json",
  withCredentials: true,
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${Cookies.get("token")}`,
  },
});
