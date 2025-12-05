import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
import { nguoidan } from "../entity/nguoidan";
import { chungcu } from "../entity/chungcu";
import { dontogiac } from "../entity/dontogiac";
import { canbo } from "../entity/canbo";
import { hosovuan } from "../entity/hosovuan";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false, 
    logging: false,
    entities: [
        nguoidan,
        chungcu,
        dontogiac,
        canbo,
        hosovuan
    ],
    subscribers: [],
    migrations: [],
});