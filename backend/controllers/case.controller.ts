import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { hosovuan } from '../entity/hosovuan';
import { dontogiac } from '../entity/dontogiac';
import { generateId } from '../utils/idreport.util';

export const caseController = {
    async getAllCases(req: Request, res: Response) {
        try {
            const caseRepo = AppDataSource.getRepository(hosovuan);

            const cases = await caseRepo.find({
                order: { ngaytao: "DESC" } 
            });

            const formattedCases = cases.map(c => {
                return {
                    id_vuan: c.id_vuan,         // Frontend gọi .id_vuan
                    tenvuan: c.tenvuan,         // Frontend gọi .tenvuan
                    mucdo: c.mucdo,             // Frontend gọi .mucdo
                    trangthai: c.trangthai,     // Frontend gọi .trangthai
                    ngaytao: c.ngaytao,         // Đã khớp
                    
                    // Các trường bổ sung (nếu cần dùng sau này)
                    nguoitao: c.nguoitao || "Admin",
                    loaitoipham: c.dontogiac ? c.dontogiac.loaitoipham : "Chưa rõ",
                    diachi: c.dontogiac ? c.dontogiac.diachivuviec : "Chưa rõ"
                };
            });

            return res.status(200).json(formattedCases);

        } catch (error) {
            console.error("Lỗi lấy danh sách vụ án:", error);
            return res.status(500).json({ message: "Lỗi server khi lấy dữ liệu vụ án" });
        }
    },

    async createCase(req: Request, res: Response) {
        try {
            const {
                tenvuan,
                mota,
                nguoitao, 
                mucdo,
                id_togiac, 
                id_canbo,
                trangthai
            } = req.body;

            const caseRepo = AppDataSource.getRepository(hosovuan);
            const reportRepo = AppDataSource.getRepository(dontogiac);

            const newCase = caseRepo.create({
                id_vuan: generateId('VA'),
                tenvuan,
                mota,
                nguoitao: nguoitao || "Admin",
                ngaytao: new Date(),
                trangthai: trangthai || "Đang điều tra",
                mucdo, 
                id_togiac: id_togiac || null,
                id_canbo: id_canbo || null
            });

            const savedCase = await caseRepo.save(newCase);

            if (id_togiac) {
                await reportRepo.update(id_togiac, { 
                    trangthai: "đang xử lý"
                });
            }

            return res.status(201).json({
                success: true,
                message: "Tạo hồ sơ vụ án thành công!",
                data: savedCase
            });

        } catch (error) {
            console.error("Lỗi tạo vụ án:", error);
            return res.status(500).json({ message: "Lỗi server khi tạo vụ án" });
        }
    }
};