const express = require("express");
const app = express();

require("dotenv").config();
const dbConfig = require("./config/dbconfig");
const mongoose = require("mongoose");

const userRoute = require("./routes/userRoutes");

app.use(express.json());
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(9000, () => {
  console.log("server is running in port 9000");
});

mongoose
  .connect(dbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
