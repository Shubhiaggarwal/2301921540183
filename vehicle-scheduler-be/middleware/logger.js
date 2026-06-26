const axiosClient = require("../utils/axiosClient");

async function log(stack, level, packageName, message) {
  try {
    const response = await axiosClient.post("/logs", {
      stack,
      level,
      package: packageName,
      message
    });

    console.log("Log Created:", response.data);
  } catch (error) {
    console.log("Logging Failed");

    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

module.exports = log;