const axios = require("axios");
const { token } = require("../config/auth");

const axiosClient = axios.create({
  baseURL: "http://4.224.186.213/evaluation-service",
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
});

module.exports = axiosClient;