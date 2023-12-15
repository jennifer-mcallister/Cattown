require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes");
const savefileRoutes = require("./routes/savefileRoutes");
const serverless = require("serverless-http");

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://cattown.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  const allowedHosts = [
    "cattown-behind-the-scene.netlify.app",
    "localhost:3000",
  ];
  const host = req.headers.host;
  console.log(`host: ${host}`);

  if (!allowedHosts.includes(host)) {
    return res.status(405).send("Host Not Allowed");
  }

  next();
});

app.use((req, res, next) => {
  console.log(`proccessing ${req.method} request to ${req.path}`);
  next();
});

app.use("/.netlify/functions/controllers", userRoutes);
app.use("/.netlify/functions/controllers", savefileRoutes);

const port = process.env.PORT || 3000;
const run = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

run();
module.exports.handler = serverless(app);
