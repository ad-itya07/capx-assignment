const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("./config/db");
const cors = require("cors");
const stockRoutes = require("./routes/stockRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose();

app.use("/api/stocks", stockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
