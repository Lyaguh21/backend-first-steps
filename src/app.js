const express = require("express");
const studentsRoutes = require("./routes/student.routes");

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// routes
app.use("/students", studentsRoutes);

// 404 на неизвестные роуты
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// глобальный обработчик ошибок (если где-то throw)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
