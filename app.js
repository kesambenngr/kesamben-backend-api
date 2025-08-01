const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const pendudukRoutes = require("./routes/pendudukRoute");
const keluargaRoutes = require("./routes/keluargaRoute");
const historyRoutes = require("./routes/historyRoute");
const desaRoutes = require("./routes/desaRoute");
const perangkatDesaRoutes = require("./routes/perangkatDesaRoute");
const historyPendudukRoutes = require("./routes/historyPendudukRoute");
const LembagaDesaRoutes = require("./routes/lembagaDesaRoute");
const suratRoutes = require("./routes/suratRoute");
const analysisRoutes = require("./routes/analysisRoute");

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug routes
console.log("Mounting routes...");
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get("/test", (req, res) => {
  res.send("Test route is working");
});
app.use("/api/penduduk", pendudukRoutes);
app.use("/api/keluarga", keluargaRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/desa", desaRoutes);
app.use("/api/perangkat", perangkatDesaRoutes);
app.use("/api/historypenduduk", historyPendudukRoutes);
app.use("/api/lembagadesa", LembagaDesaRoutes);
app.use("/api/surat", suratRoutes);
app.use("/api/analysis", analysisRoutes);
// console.log("Analysis routes mounted at /api/analysis");

// Error handling middleware
app.use(errorHandler);

module.exports = app;
