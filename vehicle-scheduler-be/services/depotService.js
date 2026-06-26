const axiosClient = require("../utils/axiosClient");

async function getDepots() {
    const res = await axiosClient.get("/evaluation-service/depots");
    return res.data;
}

module.exports = { getDepots };