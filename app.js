const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./src/routes/authRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");
const roleMiddleware = require("./src/middleware/roleMiddleware");
const testRoutes = require("./src/routes/testRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const memberRoutes = require("./src/routes/memberRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
app.use(errorMiddleware);
app.use("/api/test", testRoutes);

app.use("/api/auth", authRoutes);
app.use(errorMiddleware);
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Library Management API Running",
  });
});

module.exports = app;