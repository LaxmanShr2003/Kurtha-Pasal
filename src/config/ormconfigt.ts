import { DataSource } from "typeorm";
import { env } from "./env.config";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource: DataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: +env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: true,
  entities: [],
});

export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
    console.log("DB intialized successfully");
  } catch (err) {
    console.log("Unable to initialize datasource", err);
  }
};
