import { Request, Response } from "express";
import { AppDataSource } from "../configs/data-source";
import { nguoidan } from "../entity/nguoidan";
import { canbo } from "../entity/canbo";
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
                { expiresIn: "1h" }
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

    static updateProfile = async (req: Request, res: Response) => {
        const userId = (req as any).userPayload.id; 
        const { sodienthoai, email, diachi, gioitinh } = req.body;
        const nguoiDanRepo = AppDataSource.getRepository(nguoidan);
        try {
            const user = await nguoiDanRepo.findOneBy({ id_nguoidan: userId });
            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy người dùng!" });
            }
            if (sodienthoai !== undefined) {
                user.sodienthoai = sodienthoai;
            }
            if (email !== undefined) {
                user.email = email;
            }
            if (gioitinh !== undefined) {
                user.gioitinh = gioitinh; 
            }
            if (diachi !== undefined) {
                user.diachi = diachi;
            }
            await nguoiDanRepo.save(user);
            return res.status(200).json({ 
                message: "Cập nhật thông tin cá nhân thành công!",
                user: {
                    sodienthoai: user.sodienthoai,
                    email: user.email,
                    gioitinh: user.gioitinh,
                    diachi: user.diachi
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server nội bộ" });
        }
    };

    static loginCanBo = async (req: Request, res: Response) => {
        const { email, matkhau } = req.body;

        // 1. Kiểm tra đầu vào
        if (!email || !matkhau) {
            return res.status(400).json({ message: "Vui lòng nhập Email và Mật khẩu!" });
        }

        const canboRepo = AppDataSource.getRepository(canbo);

        try {
            // 2. Tìm cán bộ theo email
            const user = await canboRepo.findOne({
                where: { email: email }
            });

            // 3. Kiểm tra tồn tại
            if (!user) {
                return res.status(401).json({ message: "Email không tồn tại trong hệ thống!" });
            }

            // 4. Kiểm tra mật khẩu (So sánh chuỗi thường vì chưa có bcrypt)
            if (user.matkhau !== matkhau) {
                return res.status(401).json({ message: "Mật khẩu không chính xác!" });
            }

            // 5. Tạo Token
            const token = jwt.sign(
                { 
                    id_canbo: user.id_canbo, 
                    role: "congan",      // Đánh dấu role là công an
                    id_vaitro: user.id_vaitro // Quan trọng để phân quyền Thủ trưởng/Cán bộ
                },
                process.env.JWT_SECRET || "secret",
                { expiresIn: "1h" }
            );

            // 6. Trả về kết quả (Loại bỏ mật khẩu)
            const { matkhau: _, ...userData } = user;

            return res.status(200).json({
                success: true,
                message: "Đăng nhập cán bộ thành công!",
                token: token,
                user: userData // Frontend sẽ dùng user.id_vaitro để điều hướng
            });

        } catch (error) {
            console.error("Lỗi đăng nhập cán bộ:", error);
            return res.status(500).json({ message: "Lỗi server nội bộ" });
        }
    };
}