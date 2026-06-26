const { getDepots } = require("../services/depotService");
const { getVehicles } = require("../services/vehicleService");
const { getAssignments } = require("../services/assignmentService");

const knapsack = require("../algorithms/knapsack");

async function getSchedule(req, res) {
    try {
        const depots = await getDepots();
        const vehicles = await getVehicles();
        const assignments = await getAssignments();

        // Map vehicles
        const vehicleMap = {};
        vehicles.forEach(v => {
            vehicleMap[v.taskId] = v;
        });

        // Group tasks by depot
        const depotTasks = {};

        depots.forEach(d => {
            depotTasks[d.depotId] = {
                capacity: d.mechanicHours,
                tasks: []
            };
        });

        assignments.forEach(a => {
            const vehicle = vehicleMap[a.taskId];
            if (!vehicle) return;

            depotTasks[a.depotId].tasks.push({
                taskId: vehicle.taskId,
                duration: vehicle.duration,
                impact: vehicle.impact
            });
        });

        // Run knapsack for each depot
        const result = [];

        for (const depotId in depotTasks) {
            const { capacity, tasks } = depotTasks[depotId];

            const optimized = knapsack(tasks, capacity);

            result.push({
                depotId,
                capacity,
                ...optimized
            });
        }

        res.json({
            success: true,
            schedule: result
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = { getSchedule };