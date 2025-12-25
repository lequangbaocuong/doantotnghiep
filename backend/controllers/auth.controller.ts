import { Request, Response } from "express";
import { AppDataSource } from "../configs/data-source";
import { nguoidan } from "../entity/nguoidan";
import { canbo } from "../entity/canbo";
import * as bcrypt from "bcryptjs"; 
import * as jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "../services/email.service";

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

            const isPasswordValid = await bcrypt.compare(matkhau, user.matkhau);

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
            const isMatch = await bcrypt.compare(matkhauCu, user.matkhau);
            if (!isMatch) {
                return res.status(400).json({ message: "Mật khẩu cũ không chính xác!" });
            }
            const matkhaumahoa = await bcrypt.hash(matkhauMoi, 10);
            user.matkhau = matkhaumahoa;

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
        if (!matkhauMoi || matkhauMoi.length < 6) 
            return res.status(400).json({ message: "Mật khẩu không hợp lệ!" });

        const nguoiDanRepo = AppDataSource.getRepository(nguoidan);
        try {
            const user = await nguoiDanRepo.findOneBy({ id_nguoidan: userId });
            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy thông tin người dân!" });
            }
            if (!user.lan_dau_dang_nhap) {
                return res.status(403).json({ 
                    message: "Tài khoản đã kích hoạt. Vui lòng dùng chức năng đổi mật khẩu thông thường (cần mật khẩu cũ)." 
                });
            }
            const matkhaumahoa = await bcrypt.hash(matkhauMoi, 10);
            user.matkhau = matkhaumahoa;
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
                diachi: user.diachi
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

        if (!email || !matkhau) {
            return res.status(400).json({ message: "Vui lòng nhập Email và Mật khẩu!" });
        }

        const canboRepo = AppDataSource.getRepository(canbo);

        try {
            const user = await canboRepo.findOne({
                where: { email: email }
            });
            
            if (!user) {
                return res.status(401).json({ message: "Email không tồn tại trong hệ thống!" });
            }

            const isMatch = await bcrypt.compare(matkhau, user.matkhau);

            if (!isMatch) {
                return res.status(401).json({ message: "Mật khẩu không chính xác!" });
            }

            const token = jwt.sign(
                { 
                    id_canbo: user.id_canbo, 
                    role: "congan",     
                    id_vaitro: user.id_vaitro 
                },
                process.env.JWT_SECRET || "secret",
                { expiresIn: "1h" }
            );

            const { matkhau: _, ...userData } = user;

            return res.status(200).json({
                success: true,
                message: "Đăng nhập cán bộ thành công!",
                token: token,
                user: userData 
            });

        } catch (error) {
            console.error("Lỗi đăng nhập cán bộ:", error);
            return res.status(500).json({ message: "Lỗi server nội bộ" });
        }
    };

    static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Vui lòng nhập Email!" });

        const danRepo = AppDataSource.getRepository(nguoidan);
        

        try {
            let user: any = await danRepo.findOneBy({ email });
            let type = 'nguoidan';

            if (!user) {
                return res.status(404).json({ message: "Email không tồn tại trong hệ thống!" });
            }

           const resetToken = jwt.sign(
                { id: user.id_nguoidan, type: 'nguoidan' },
                process.env.JWT_SECRET || "secret",
                { expiresIn: "15m" }
            );

            const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;

            await sendResetPasswordEmail(email, resetLink);

            return res.json({ message: "Link đặt lại mật khẩu đã được gửi vào Email của bạn!" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi gửi email" });
        }
    };

    static resetPassword = async (req: Request, res: Response) => {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) return res.status(400).json({ message: "Thiếu thông tin!" });
        if (newPassword.length < 6) return res.status(400).json({ message: "Mật khẩu phải >= 6 ký tự" });

        try {
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
            const { id, type } = decoded;

            const danRepo = AppDataSource.getRepository(nguoidan);
            const canboRepo = AppDataSource.getRepository(canbo);
            
            let user: any;
            let repo: any;

            if (type === 'nguoidan') {
                repo = danRepo;
                user = await danRepo.findOneBy({ id_nguoidan: id });
            } else {
                repo = canboRepo;
                user = await canboRepo.findOneBy({ id_canbo: id });
            }

            if (!user) return res.status(404).json({ message: "User không tồn tại!" });

            const salt = await bcrypt.genSalt(10);
            user.matkhau = await bcrypt.hash(newPassword, salt);

            await repo.save(user);

            return res.json({ message: "Đặt lại mật khẩu thành công! Hãy đăng nhập lại." });

        } catch (error) {
            return res.status(400).json({ message: "Link đã hết hạn hoặc không hợp lệ!" });
        }
    };
}