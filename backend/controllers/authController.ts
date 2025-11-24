import { Request, Response } from "express";
import { AppDataSource } from "../configs/data-source";
import { nguoidan } from "../entity/nguoidan";
//import * as bcrypt from "bcryptjs"; chưa mã hóa mật khẩu, chỉ test api
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
                    cccd: user.cccd
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
                    cccd: user.cccd,
                    lan_dau_dang_nhap: user.lan_dau_dang_nhap
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server nội bộ" });
        }
    };
    static changePassword = async (req: Request, res: Response) => {
        const userId = (req as any).userPayload.id;
        const { matkhauCu, matkhauMoi } = req.body;
        if (!matkhauCu || !matkhauMoi) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ mật khẩu cũ và mới!" });
        }
        const nguoiDanRepo = AppDataSource.getRepository(nguoidan);
        try {
            const user = await nguoiDanRepo.findOneBy({ id_nguoidan: userId });
            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy người dùng!" });
            }
            if (matkhauCu !== user.matkhau) {
                return res.status(400).json({ message: "Mật khẩu cũ không chính xác!" });
            }
            // const isMatch = await bcrypt.compare(matkhauCu, user.matkhau);
            // if (!isMatch) {
            //     return res.status(400).json({ message: "Mật khẩu cũ không chính xác!" });
            // }
            user.matkhau = matkhauMoi;
            // const newHashPassword = await bcrypt.hash(matkhauMoi, 10);
            // user.matkhau = newHashPassword;
            await nguoiDanRepo.save(user);
            return res.status(200).json({ message: "Đổi mật khẩu thành công!" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    };

    static changePasswordFirstTime = async (req: Request, res: Response) => {
        const userId = (req as any).userPayload.id;
        const { matkhauMoi } = req.body; 
        if (!matkhauMoi) {
            return res.status(400).json({ message: "Vui lòng nhập mật khẩu mới!" });
        }
        if (matkhauMoi.length < 6) {
             return res.status(400).json({ message: "Mật khẩu phải từ 6 ký tự trở lên!" });
        }
        const nguoiDanRepo = AppDataSource.getRepository(nguoidan);
        try {
            const user = await nguoiDanRepo.findOneBy({ id_nguoidan: userId });
            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy người dùng!" });
            }
            if (!user.lan_dau_dang_nhap) {
                return res.status(403).json({ 
                    message: "Tài khoản đã kích hoạt. Vui lòng dùng chức năng đổi mật khẩu thông thường (cần mật khẩu cũ)." 
                });
            }
            user.matkhau = matkhauMoi; 
            user.lan_dau_dang_nhap = false;
            await nguoiDanRepo.save(user);
            return res.status(200).json({ message: "Kích hoạt tài khoản và đổi mật khẩu thành công!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    };

    static getProfile = async (req: Request, res: Response) => {
        const userId = (req as any).userPayload.id; 
        const nguoiDanRepo = AppDataSource.getRepository(nguoidan);
        try {
            const user = await nguoiDanRepo.findOneBy({ id_nguoidan: userId });
            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy người dùng!" });
            }
            return res.status(200).json({
                id: user.id_nguoidan,
                hoten: user.hoten,
                cccd: user.cccd,
                sodienthoai: user.sodienthoai,
                gioitinh: user.gioitinh,
                email: user.email,
                ngaysinh: user.ngaysinh,
                lan_dau_dang_nhap: user.lan_dau_dang_nhap,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server nội bộ" });
        }
    };
}