import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { AppDataSource } from "./configs/data-source";
import authRoutes from "./routes/auth.route";
import reportRoutes from "./routes/report.route";
import caseRoutes from "./routes/case.route";
import suspectRoutes from "./routes/suspect.route";
import wantedRoutes from "./routes/wanted.route";
import assignmentRoutes from "./routes/assignment.route";
import adminRoutes from "./routes/admin.route";
import evidenceRoutes from "./routes/evidence.route";
import resultRoutes from "./routes/result.route"
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/report", reportRoutes);  
app.use("/api/suspects", suspectRoutes);
app.use("/api/wanted", wantedRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/evidence", evidenceRoutes); 
app.use("/api/results", resultRoutes);

AppDataSource.initialize()
    .then(() => {
        console.log("Kết nối Database thành công!");
        
        app.listen(PORT, () => {
            console.log(`Server đang chạy tại http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log("Lỗi kết nối Database: ", error));