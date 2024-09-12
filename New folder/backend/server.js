// backend/server.js
const express = require("express");
const cors = require("cors");
const dataRoutes = require("./routes/dataRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
// const incomeExpenseRoutes = require('./routes/incomeExpenseRoutes'); // Import new routes
const authenticateToken = require("./middleware/authMiddleware");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

// Route ที่ไม่ต้องการการพิสูจน์ตัวตน
app.use("/api/auth", authRoutes); // ส่งคำขอไปที่ authRoutes

// Routes ที่ต้องการการพิสูจน์ตัวตน
app.use("/api/data",authenticateToken, dataRoutes);
app.use("/api/users",authenticateToken, userRoutes);
// app.use('/api/income-expense', authenticateToken, incomeExpenseRoutes); // Use new routes


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
