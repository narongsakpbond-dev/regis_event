require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const summaryRoutes = require("./routes/SummaryRoutes");
const adminRoutes = require("./routes/AdminRoutes");
const registrationRoutes = require("./routes/RegistrationRoutes");

const SeatConfig = require("./models/SeatConfig");

require("./models/Registration"); // แค่ require เพื่อให้ index ถูกสร้าง

const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
  const cfg = await SeatConfig.getSingleton();
  res.json({ ok: true, db: cfg ? "ready" : "not_ready" });
});

app.use("/api", summaryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/registrations", registrationRoutes);

(async () => {
  await connectDB();
  await SeatConfig.getSingleton(); // สร้าง singleton document
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("🚀 Server running on port", port));
})();