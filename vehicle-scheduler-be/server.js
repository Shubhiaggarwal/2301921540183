const express = require("express");
const log = require("./middleware/logger");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    await log(
      "backend",
      "info",
      "route",
      "Home route accessed"
    );

    res.send("Server Running");
  } catch (err) {
    console.error("Logging failed:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, async () => {
  console.log("Server Started");

  try {
    await log(
      "backend",
      "info",
      "service",
      "Server Started Successfully"
    );
  } catch (err) {
    console.error("Startup log failed:", err);
  }
});