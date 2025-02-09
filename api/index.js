const express = require("express");
const connectDB = require("./services/Database");
const XMLRoutes = require("./routes/Routes");
const cors = require("cors");
const server = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

connectDB();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://saquib-credit-sea.vercel.app/",
// ];

server.use(
  cors({
    origin: "https://saquib-credit-sea.vercel.app", // Your Vercel frontend URL
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

server.use(cors({ origin: "*" }));

// const __dirname = path.resolve();

server.use(express.json());
server.use("/xml", XMLRoutes);

server.get("/CreditSea", (req, res) => {
  res.json("CreditSea");
});

server.use(express.static(path.join(__dirname, "../client/dist")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
