import { Request, Response } from 'express';
// BỎ DÒNG NÀY: import { getRepository } from 'typeorm'; 
// THAY BẰNG DÒNG DƯỚI (đường dẫn trỏ tới file data-source của bạn):
import { AppDataSource } from '../configs/data-source'; 

import { nguoidan, GioiTinh } from '../entity/nguoidan';
import { dontogiac, LoaiToiPham, VaiTroNguoiDan } from '../entity/dontogiac';
import { chungcu, LoaiChungCu } from '../entity/chungcu';
import { generateId } from '../utils/idreport.util';

export const reportController = {
    async submitReport(req: Request, res: Response) {
        try {
            const {
                hoten, email, sodienthoai, diachi, cccd, gioitinh,
                loaitoipham, vaitronguoidan, tieude, noidung, diachivuviec, ngayxayra, andanh,
                loaichungcu
            } = req.body;
            
            const uploadedFiles = req.files as Express.Multer.File[];
            
            // --- SỬA ĐOẠN NÀY ---
            // Thay vì dùng getRepository trực tiếp, hãy dùng qua AppDataSource
            const nguoidanRepo = AppDataSource.getRepository(nguoidan);
            const dontogiacRepo = AppDataSource.getRepository(dontogiac);
            const chungcuRepo = AppDataSource.getRepository(chungcu);
            // --------------------
            
            let nguoidanId: string | null = null;
            
            // ... (Các phần logic bên dưới giữ nguyên không cần sửa) ...

            // Kiểm tra user
            let user = await nguoidanRepo.findOne({ where: { cccd } });

            if (!user) {
                user = nguoidanRepo.create({
                    id_nguoidan: generateId('ND'),
                    cccd, hoten, sodienthoai, email,
                    gioitinh: gioitinh as GioiTinh,
                    diachi, matkhau: '123456', anh: '', lan_dau_dang_nhap: true
                });
                await nguoidanRepo.save(user);
            }
            nguoidanId = user.id_nguoidan;

            // Tạo đơn tố giác
            const newToGiac = dontogiacRepo.create({
                id_togiac: generateId('DT'),
                id_nguoidan: nguoidanId,
                tieude, noidung,
                loaitoipham: loaitoipham as LoaiToiPham,
                vaitronguoidan: vaitronguoidan as VaiTroNguoiDan,
                andanh: String(andanh) === '1' || String(andanh) === 'true',
                trangthai: 'chưa xử lý',
                ngaygui: new Date(),
                ngayxayra, diachivuviec
            });

            const savedToGiac = await dontogiacRepo.save(newToGiac);

            // Tạo chứng cứ
            if (uploadedFiles && uploadedFiles.length > 0) {
                const chungcuEntities = uploadedFiles.map(file => {
                    return chungcuRepo.create({
                        id_chungcu: generateId('CC'),
                        id_nguoidan: nguoidanId,
                        duongdantaptin: `/uploads/evidences/${file.filename}`,
                        loaichungcu: loaichungcu as LoaiChungCu,
                        mota: `Chứng cứ thuộc đơn tố giác mã số: ${savedToGiac.id_togiac}`,
                        ngaygui: new Date(),
                    });
                });
                await chungcuRepo.save(chungcuEntities);
            }

            return res.status(200).json({ 
                success: true,
                message: 'Gửi tố giác thành công!', 
                id_togiac: savedToGiac.id_togiac 
            });

        } catch (error) {
            console.error('Lỗi API submit-report:', error);
            return res.status(500).json({ 
                success: false,
                message: 'Lỗi server: Không thể gửi tố giác.' 
            });
        }
    },

    async getAllReports(req: Request, res: Response) {
        try {
            const reportRepo = AppDataSource.getRepository(dontogiac);
            
            // Lấy tất cả, sắp xếp ngày gửi mới nhất lên đầu
            const reports = await reportRepo.find({
                order: { ngaygui: "DESC" }
            });

            return res.status(200).json(reports);
        } catch (error) {
            console.error("Lỗi lấy danh sách tố giác:", error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    },

    async getReportDetail(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const reportRepo = AppDataSource.getRepository(dontogiac);
            const report = await reportRepo.findOne({
                where: { id_togiac: id },
                relations: ["nguoidan"] 
            });

            if (!report) {
                return res.status(404).json({ message: "Không tìm thấy đơn tố giác này" });
            }
            return res.status(200).json(report);
        } catch (error) {
            console.error("Lỗi lấy chi tiết tố giác:", error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    }
};