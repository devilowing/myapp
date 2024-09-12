// backend/server.js
const express = require("express");
const cors = require("cors");
const dataRoutes = require("./routes/dataRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require('./routes/transactionRoutes'); // Import transaction routes
const authenticateToken = require("./middleware/authMiddleware");
const db = require("./models");
const debtRoutes = require("./routes/debtRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Route ที่ไม่ต้องการการพิสูจน์ตัวตน
app.use("/auth", authRoutes); // ส่งคำขอไปที่ authRoutes
// Routes ที่ต้องการการพิสูจน์ตัวตน
app.use("/data", authenticateToken, dataRoutes);
app.use("/users", authenticateToken, userRoutes);
app.use('/transactions', authenticateToken, transactionRoutes); // Use transaction routes
app.use('/debts', authenticateToken, debtRoutes); // Use transaction routes

db.sequelize
  .sync({ alter: true }) // Use `alter` to update tables without dropping
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
