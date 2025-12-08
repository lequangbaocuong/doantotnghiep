import { Request, Response } from 'express';
import { AppDataSource } from '../configs/data-source';
import { hosovuan } from '../entity/hosovuan';
import { dontogiac } from '../entity/dontogiac';
import { generateId } from '../utils/idreport.util';
import { canbo } from '../entity/canbo';

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
    },

    async getCaseDetail(req: Request, res: Response) {
        try {
            const { id } = req.params;
            console.log("Đang tìm vụ án với ID:", id);
            const caseRepo = AppDataSource.getRepository(hosovuan);

            const caseDetail = await caseRepo.findOne({
                where: { id_vuan: id },
                relations: ["ds_nghipham", "dontogiac", "canbo"] // Lấy kèm Nghi phạm, Đơn tố giác, Cán bộ
            });

            if (!caseDetail) {
                return res.status(404).json({ message: "Không tìm thấy vụ án" });
            }

            return res.status(200).json(caseDetail);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server" });
        }
    },

    async assignOfficer(req: Request, res: Response) {
        try {
            const { id } = req.params; 
            const { id_canbo } = req.body; 

            const caseRepo = AppDataSource.getRepository(hosovuan);
            
            const existingCase = await caseRepo.findOneBy({ id_vuan: id });
            if (!existingCase) {
                return res.status(404).json({ message: "Không tìm thấy vụ án!" });
            }

            existingCase.id_canbo = id_canbo;

            await caseRepo.save(existingCase);

            return res.status(200).json({ 
                success: true,
                message: "Phân công điều tra viên thành công!",
                data: existingCase
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Lỗi server khi phân công" });
        }
    },

    async getInvestigators(req: Request, res: Response) {
        try {
            const canboRepo = AppDataSource.getRepository(canbo);
            
            // Giả sử mã VT003 là cán bộ điều tra (dựa theo file SQL bạn gửi)
            const investigators = await canboRepo.find({
                where: { id_vaitro: 'VT003' },
                select: ['id_canbo', 'hoten', 'email'] // Chỉ lấy các trường cần thiết
            });

            return res.status(200).json(investigators);
        } catch (error) {
            return res.status(500).json({ message: "Lỗi lấy danh sách cán bộ" });
        }
    }
};