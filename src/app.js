const express = require("express");
const studentsRoutes = require("./routes/student.routes");
const cors = require("cors");

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// routes
app.use("/students", studentsRoutes);

// 404 на неизвестные роуты
app.use((err, req, res, next) => {
  console.error(err);

  if (err.code === "P2002") {
    return res.status(400).json({
      error: "Unique constraint failed",
      meta: err.meta,
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      error: "Record not found",
    });
  }

  res.status(500).json({
    error: "Internal Server Error",
  });
});

module.exports = app;
