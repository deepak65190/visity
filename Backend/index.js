require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const { visityRoute } = require("./routes/visity.route");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to the Visity assignment");
});
app.use("/visity", visityRoute);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err.message);
  }

  console.log(`listing on ${process.env.PORT}`);
});
