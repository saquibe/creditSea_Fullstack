const express = require("express");
const connectDB = require("./services/Database");
const XMLRoutes = require("./routes/Routes");
const cors = require("cors");
const server = express();
const PORT = process.env.PORT || 5000;

connectDB();

server.use(
  cors({
    origin:
      "https://saquib-credit-sea.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

server.use(express.json());
server.use("/xml", XMLRoutes);

server.get("/CreditSea", (req, res) => {
  res.json("CreditSea");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
