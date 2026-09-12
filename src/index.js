import "dotenv/config";
import mongoose, { connect } from "mongoose";
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js";

import express from "express";
const app = express();

connectDB()
.then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
})
.catch((error) => {
  console.error("Failed to connect to the database:", error);
  process.exit(1); // Exit the process with an error code
});