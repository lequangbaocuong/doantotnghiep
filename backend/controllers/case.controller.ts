import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { hosovuan } from '../entity/hosovuan';

export const caseController = {
    async getAllCases(req: Request, res: Response) {
        try {
            const caseRepo = AppDataSource.getRepository(hosovuan);

            const cases = await caseRepo.find({
                relations: ["dontogiac"], 
                order: { ngaytao: "DESC" } 
            });

            const formattedCases = cases.map(c => {
                return {
                    id: c.id_vuan, 
                    type: c.dontogiac ? c.dontogiac.loaitoipham : c.tenvuan, 
                    level: c.mucdo, 
                    date: new Date(c.ngaytao).toLocaleDateString('vi-VN'),
                    reporter: c.nguoitao || "Admin", 
                    location: c.dontogiac ? c.dontogiac.diachivuviec : "Chưa rõ", 
                    status: c.trangthai 
                };
            });

            return res.status(200).json(formattedCases);

        } catch (error) {
            console.error("Lỗi lấy danh sách vụ án:", error);
            return res.status(500).json({ message: "Lỗi server khi lấy dữ liệu vụ án" });
        }
    }
};