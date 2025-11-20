import { Request, Response } from "express";
import { AppDataSource } from "../configs/data-source";
import { nguoidan } from "../entity/nguoidan";
//import * as bcrypt from "bcryptjs"; //chưa mã hóa mật khẩu, chỉ test api
import * as jwt from "jsonwebtoken";

export class AuthController {
    static login = async (req: Request, res: Response) => {
        const { cccd, matkhau } = req.body;
        if (!cccd || !matkhau) {
            return res.status(400).json({ message: "Vui lòng nhập CCCD và mật khẩu!" });
        }

        const nguoiDanRepo = AppDataSource.getRepository(nguoidan);
        
        try {
            const user = await nguoiDanRepo.findOneBy({ cccd: cccd });
            if (!user) {
                return res.status(401).json({ message: "Sai thông tin đăng nhập!" });
            }
            const isPasswordValid = matkhau === user.matkhau; // chưa mã hóa mật khẩu, chỉ test api
            //await bcrypt.compare(matkhau, user.matkhau); //dùng bcrypt để mã hóa mật khẩu

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Sai thông tin đăng nhập!" });
            }

            const token = jwt.sign(
                { 
                    id: user.id_nguoidan, 
                    cccd: user.cccd,
                    role: 'nguoidan' 
                },
                process.env.JWT_SECRET || "secret",
                { expiresIn: "24h" }
            );

            return res.status(200).json({
                message: "Đăng nhập thành công",
                token: token,
                user: {
                    id: user.id_nguoidan,
                    hoten: user.hoten,
                    cccd: user.cccd
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server nội bộ" });
        }
    };
    
}