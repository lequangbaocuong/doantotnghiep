import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ message: "Không tìm thấy token!" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token không hợp lệ!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

        (req as any).userPayload = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Token không hợp lệ hoặc hết hạn!" });
    }
};
