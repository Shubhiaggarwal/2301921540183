const axiosClient = require("../utils/axiosClient");

async function getVehicles() {
    const res = await axiosClient.get("/evaluation-service/vehicles");
    return res.data;
}

module.exports = { getVehicles };