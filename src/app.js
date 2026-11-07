
const express = require("express");

const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to Support Ticket Management System");
});

app.use("/tickets", ticketRoutes);
app.use("/users", userRoutes);
app.use("/stats", statsRoutes);

module.exports = app;
