import axios from "axios";

const url = "https://opentdb.com/";

const ApiService = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiService;
