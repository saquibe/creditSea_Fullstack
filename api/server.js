const express = require("express");
const connectDB = require("./services/Database");
const XMLRoutes = require("./routes/Routes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only this origin
    methods: ["GET", "POST"], // Allow only specific HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

app.use(express.json());
app.use("/xml", XMLRoutes);

app.get("/CreditSea", (req, res) => {
  res.json("CreditSea");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
