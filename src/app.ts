import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { initializeDataSource } from "./config/ormconfigt";
import { initializeExpressServer } from "./config/expressConfig";

(function main() {
  try {
    initializeDataSource();
    const app = express();
    initializeExpressServer(app);
  } catch (err) {
    console.log(err);
  }
})();
