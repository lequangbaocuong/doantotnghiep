import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AppDataSource } from "./configs/data-source";
import authRoutes from "./routes/auth.route";
import reportRoutes from "./routes/report.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes);  

AppDataSource.initialize()
    .then(() => {
        console.log("Kết nối Database thành công!");
        
        app.listen(PORT, () => {
            console.log(`Server đang chạy tại http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log("Lỗi kết nối Database: ", error));