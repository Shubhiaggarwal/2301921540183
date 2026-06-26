const express = require("express");
const log = require("./middleware/logger");

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {

  await log(
    "backend",
    "info",
    "route",
    "Home route accessed"
  );

  res.send("Server Running");
});

app.listen(3000, () => {
  console.log("Server Started");

  log(
    "backend",
    "info",
    "service",
    "Server Started Successfully"
  );
});