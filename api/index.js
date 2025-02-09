const express = require("express");
const connectDB = require("./services/Database");
const XMLRoutes = require("./routes/Routes");
const cors = require("cors");
const server = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://api-3q3jadv2q-mohammad-saquibs-projects-83cdffac.vercel.app/",
];

server.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If using cookies or authentication
  })
);

// const __dirname = path.resolve();

server.use(express.json());
server.use("/xml", XMLRoutes);

server.get("/CreditSea", (req, res) => {
  res.json("CreditSea");
});

server.use(express.static(path.join(__dirname, "/client/dist")));

server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
