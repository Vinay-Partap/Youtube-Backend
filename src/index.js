import "dotenv/config";
import mongoose, { connect } from "mongoose";
import {DB_NAME} from "./constants.js"
import connectDB from "./db/index.js";

import express from "express";
const app = express();

connectDB();