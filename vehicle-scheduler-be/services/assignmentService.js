const axiosClient = require("../utils/axiosClient");

async function getAssignments() {
    const res = await axiosClient.get("/evaluation-service/assignments");
    return res.data;
}

module.exports = { getAssignments };